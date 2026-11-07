import SwiftUI
import WidgetKit

// Snapshot written by the app (src/utils/widget.ts); the widget never calls the API.
struct WidgetEvent: Codable {
  let subscription_id: String
  let platform_id: String
  let name: String
  let date: String // local YYYY-MM-DD
  let kind: String // renewal | trial_end
  let amount: String
  let currency: String
  let expected_charge: Bool
  let estimated: Bool
}

struct WidgetSnapshot: Codable {
  let version: Int
  let event: WidgetEvent?
  let more: Int?
}

enum SnapshotStore {
  static let group = "group.com.renewless"
  static let key = "widget_snapshot"

  static func load() -> WidgetSnapshot? {
    guard let text = UserDefaults(suiteName: group)?.string(forKey: key), let data = text.data(using: .utf8) else { return nil }
    return try? JSONDecoder().decode(WidgetSnapshot.self, from: data)
  }
}

struct RenewlessEntry: TimelineEntry {
  let date: Date
  let event: WidgetEvent?
  var more = 0
}

struct Provider: TimelineProvider {
  static let sample = WidgetEvent(subscription_id: "", platform_id: "netflix", name: "Netflix", date: dayString(Date()), kind: "renewal", amount: "15.99", currency: "USD", expected_charge: true, estimated: false)

  func placeholder(in context: Context) -> RenewlessEntry { RenewlessEntry(date: Date(), event: Provider.sample) }

  func getSnapshot(in context: Context, completion: @escaping (RenewlessEntry) -> Void) {
    let snapshot = SnapshotStore.load()
    let event = snapshot?.event
    completion(RenewlessEntry(date: Date(), event: context.isPreview && event == nil ? Provider.sample : event, more: snapshot?.more ?? 0))
  }

  // One entry per local midnight for a week so "Today" / "In N days" stays right without the app.
  func getTimeline(in context: Context, completion: @escaping (Timeline<RenewlessEntry>) -> Void) {
    let snapshot = SnapshotStore.load()
    let event = snapshot?.event
    let more = snapshot?.more ?? 0
    let calendar = Calendar.current
    let start = calendar.startOfDay(for: Date())
    var entries = [RenewlessEntry(date: Date(), event: event, more: more)]
    for day in 1...7 {
      if let date = calendar.date(byAdding: .day, value: day, to: start) { entries.append(RenewlessEntry(date: date, event: event, more: more)) }
    }
    completion(Timeline(entries: entries, policy: .atEnd))
  }
}

func dayString(_ date: Date) -> String {
  let formatter = DateFormatter()
  formatter.calendar = Calendar(identifier: .gregorian)
  formatter.locale = Locale(identifier: "en_US_POSIX")
  formatter.dateFormat = "yyyy-MM-dd"
  return formatter.string(from: date)
}

func parseDay(_ text: String) -> Date? {
  let formatter = DateFormatter()
  formatter.calendar = Calendar(identifier: .gregorian)
  formatter.locale = Locale(identifier: "en_US_POSIX")
  formatter.dateFormat = "yyyy-MM-dd"
  return formatter.date(from: text)
}

extension Color {
  init(hex: UInt32, opacity: Double = 1) {
    self.init(.sRGB, red: Double((hex >> 16) & 0xFF) / 255, green: Double((hex >> 8) & 0xFF) / 255, blue: Double(hex & 0xFF) / 255, opacity: opacity)
  }
  static let tile = Color(hex: 0x202628)
  static let tileBorder = Color(hex: 0xB9E58C, opacity: 0.14)
  static let brandText = Color(hex: 0xD0D9CC)
  static let primaryText = Color(hex: 0xEDF1E8)
  static let timingText = Color(hex: 0xC6D0C3)
  static let mutedText = Color(hex: 0x9DAAA3)
  static let mint = Color(hex: 0xB9E58C)
  static let coral = Color(hex: 0xF29B8F)
  static let trialBlue = Color(hex: 0x9EBCE0)
}

func raleway(_ size: CGFloat, medium: Bool = false) -> Font {
  .custom(medium ? "Raleway-Medium" : "Raleway-Regular", size: size)
}

// Same wording as the approved Small widget (prototype widget-preview.js).
struct EventCopy {
  let eyebrow: String
  let accent: Color
  let amount: String
  let line: String
  let label: String

  init?(_ event: WidgetEvent, now: Date, more: Int) {
    let calendar = Calendar.current
    guard let date = parseDay(event.date) else { return nil }
    let days = calendar.dateComponents([.day], from: calendar.startOfDay(for: now), to: calendar.startOfDay(for: date)).day ?? 0
    // A passed event means the snapshot is out of date: the view shows Needs update instead.
    if days < 0 { return nil }
    let trial = event.kind == "trial_end"
    eyebrow = trial ? "TRIAL ENDING" : days == 0 ? "DUE TODAY" : "NEXT RENEWAL"
    accent = trial ? .trialBlue : days == 0 ? .coral : .mint
    let price = Double(event.amount)
    amount = !event.expected_charge ? "Auto-renew off" : price.map { "\(event.currency) \(String(format: "%.2f", $0))" } ?? "Amount not set"
    let when = days == 0 ? "Today" : days == 1 ? "Tomorrow" : "In \(days) days"
    let full = DateFormatter()
    full.locale = Locale(identifier: "en_GB")
    full.dateFormat = "d MMM"
    line = "\(when) · \(full.string(from: date))"
    full.dateFormat = "d MMM yyyy"
    let verb = trial ? "Trial ends" : "Renews"
    let timing = days == 0 ? "\(verb) today" : days == 1 ? "\(verb) tomorrow" : "\(verb) in \(days) days"
    label = "\(event.name). \(timing), \(full.string(from: date))\(event.estimated ? ", estimated date" : ""). \(amount)\(trial && event.expected_charge ? " after trial" : "")\(more > 0 ? ". And \(more) more on this day" : ""). Open subscription"
  }
}

struct Brand: View {
  let dot: Color
  var body: some View {
    HStack(spacing: 5) {
      Image("RenewlessMark").resizable().frame(width: 14, height: 14)
      Text("RENEWLESS").font(raleway(12)).tracking(0.8).foregroundColor(.brandText)
      Spacer(minLength: 0)
      Circle().fill(dot).frame(width: 5, height: 5)
    }
  }
}

// All clear and Needs update share the quiet layout: faded Loop at the top right and three lines.
struct QuietView: View {
  let mascot: String
  let title: String
  let line: String
  let note: String
  var body: some View {
    ZStack(alignment: .topTrailing) {
      Image(mascot).resizable().frame(width: 64, height: 64).opacity(0.5).offset(x: 9, y: 16).accessibilityHidden(true)
      VStack(alignment: .leading, spacing: 0) {
        Brand(dot: .mint)
        Text(title).font(raleway(12, medium: true)).foregroundColor(.primaryText).padding(.top, 33)
        Text(line).font(raleway(12)).foregroundColor(.timingText).padding(.top, 5)
        Text(note).font(raleway(12)).foregroundColor(.mutedText).padding(.top, 5)
      }
    }
  }
}

struct RenewlessWidgetView: View {
  let entry: RenewlessEntry

  var body: some View {
    Group {
      if let event = entry.event, let copy = EventCopy(event, now: entry.date, more: entry.more) {
        VStack(alignment: .leading, spacing: 0) {
          Brand(dot: copy.accent)
          // Fixed gaps as in the prototype; the block is centred so spare height splits top and bottom.
          HStack(alignment: .firstTextBaseline) {
            Text(copy.eyebrow).font(raleway(12)).tracking(1).foregroundColor(copy.accent)
            Spacer(minLength: 4)
            if entry.more > 0 { Text("+\(entry.more)").font(raleway(12)).foregroundColor(.timingText) }
          }.padding(.top, 13)
          HStack(spacing: 6) {
            if UIImage(named: "platform-\(event.platform_id)") != nil {
              Image("platform-\(event.platform_id)").resizable().scaledToFit().frame(width: 18, height: 18)
            }
            Text(event.name).font(raleway(12, medium: true)).tracking(-0.3).foregroundColor(.primaryText).lineLimit(1)
          }.padding(.top, 5)
          Text(copy.amount).font(raleway(copy.amount.count > 12 ? 14 : 22, medium: true)).tracking(-0.7).foregroundColor(.primaryText).lineLimit(1).minimumScaleFactor(0.7).padding(.top, 7)
          Text(copy.line).font(raleway(12)).foregroundColor(.timingText).lineLimit(1).minimumScaleFactor(0.8).padding(.top, 5)
        }
        .accessibilityElement(children: .ignore)
        .accessibilityLabel(copy.label)
        .widgetURL(URL(string: "renewless://subscription/\(event.subscription_id)"))
      } else if entry.event != nil {
        QuietView(mascot: "LoopNeutral", title: "Time to check in.", line: "Open Renewless", note: "to see what’s next.")
          .accessibilityElement(children: .ignore)
          .accessibilityLabel("Time to check in. Open Renewless to see what’s next.")
          .widgetURL(URL(string: "renewless://home"))
      } else {
        QuietView(mascot: "LoopHappy", title: "All clear.", line: "Nothing coming up.", note: "A little peace of mind.")
        .accessibilityElement(children: .ignore)
        .accessibilityLabel("All clear. Nothing coming up. Open Renewless")
        .widgetURL(URL(string: "renewless://home"))
      }
    }
    .padding(15)
    .frame(maxWidth: .infinity, maxHeight: .infinity)
    .containerBackground(for: .widget) {
      ContainerRelativeShape().fill(Color.tile).overlay(ContainerRelativeShape().strokeBorder(Color.tileBorder, lineWidth: 1))
    }
  }
}

@main
struct RenewlessWidget: Widget {
  var body: some WidgetConfiguration {
    StaticConfiguration(kind: "RenewlessWidget", provider: Provider()) { entry in
      RenewlessWidgetView(entry: entry)
    }
    .configurationDisplayName("Renewless")
    .description("Your next renewal or trial ending.")
    .supportedFamilies([.systemSmall])
    .contentMarginsDisabled()
  }
}
