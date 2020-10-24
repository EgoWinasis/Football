const webPush = require('web-push');
const vapidKeys = {
    "publicKey": "BN1aSiffLrtvVVvEEHXVHXrPq9klQSUfLgJxRCBtftzLByv60VfBhzMNxneMeW7hI-rPKsjvYmeS33bv5SBAhd0",
    "privateKey": "XRsNc_0_CHAFzWyqsLHUV-snN1PilAh3iG8_Sbnt73M"
};
 
 
webPush.setVapidDetails(
    'mailto:egowinasis22@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
const pushSubscription = {
    "endpoint": " https://fcm.googleapis.com/fcm/send/dx3uDmDPhYY:APA91bF9Q_EYaYPJafZM4WHCe8YDNpJM6v5ohm9b5bXSXN1sQsmcATm_2XP5DXRhNAA2mcqnbGNKPTvTE8GClDaJm_3uZL-xPMzvlzHIV6qPdezHARhSaglnOplLpV8Pb1t_iBgebCoO",
    "keys": {
        "p256dh": "BMfzyql+fhPom1Nzu9nKVnTvlxFsnAJD89qZ5EDr855lDdiY1eWHRHBQlc9w2EvL4fDetcHe5CfzUUeMHNzmu4c=",
        "auth": "HfAdcFbiTVh/S0T4XjtSrw=="
    }
};
const payload = 'check the schedule of matches that will take place today!';
const options = {
    gcmAPIKey: '5391093505563',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);