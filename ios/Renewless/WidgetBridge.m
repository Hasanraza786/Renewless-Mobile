#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(RenewlessWidget, NSObject)
RCT_EXTERN_METHOD(setSnapshot:(NSString *)json)
RCT_EXTERN_METHOD(clear)
RCT_EXTERN_METHOD(isInstalled:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
@end
