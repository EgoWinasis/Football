const webPush = require('web-push');
const vapidKeys = {
    "publicKey": "BIcIKxueU743B0yWOIZ5f4HewojzDI9OPkpTS55H0IPgsA5P67OnFdTJ0IZccNqRwz973zsA10XKD66G-jB7sew",
    "privateKey": "4kKa5kt3qK11eopE3yhkdxeeqdeM3kQoCNY79y_-y1c"
};
 
 
webPush.setVapidDetails(
    'mailto:egowinasis22@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
const pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/ejlP7Zq8Kc0:APA91bEanaLH9cR2j0zxcvTPXy6a1vfRP_qCA8lpM2xZwGFi47wpeoDLiELhBz_zEQmVky4e4yHE_Zb6Za43-GkPHGw4NK3XE-UR18Nc1ySCcJ0LuP0sBWgqDlOGHJqFr-299b5ZrCTO",
    "keys": {
        "p256dh": "BIiQiuiFEUbVZsZvMG5Byvf/O3VUXYwdBoevVNTfQkcESiP+RGSJ9CO/pxqlUwejFeGiKloeQtC/1u0zQpzuH9A=",
        "auth": "2MZ6RkzZ52s6+4L2rCZKIg=="
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


