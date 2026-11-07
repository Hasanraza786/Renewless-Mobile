import Foundation
import React
import WidgetKit

// Writes the Home Screen widget snapshot to the shared app group and reports whether the widget is placed.
@objc(RenewlessWidget)
class WidgetBridge: NSObject {
  private let defaults = UserDefaults(suiteName: "group.com.renewless")

  @objc static func requiresMainQueueSetup() -> Bool { false }

  @objc func setSnapshot(_ json: String) {
    defaults?.set(json, forKey: "widget_snapshot")
    WidgetCenter.shared.reloadAllTimelines()
  }

  @objc func clear() {
    defaults?.removeObject(forKey: "widget_snapshot")
    WidgetCenter.shared.reloadAllTimelines()
  }

  @objc func isInstalled(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
    WidgetCenter.shared.getCurrentConfigurations { result in
      switch result {
      case .success(let widgets): resolve(widgets.contains { $0.kind == "RenewlessWidget" })
      case .failure(let error): reject("widget_status", error.localizedDescription, error)
      }
    }
  }
}
