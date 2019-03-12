import { IMsgs } from './../models';
class ActionServiceClass {
    executeActions(msg: IMsgs) {
        this.executeCallAction(msg);
    }

    executeCallAction(msg: IMsgs) {
        if(msg.isCall) {
            if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
                window.open("tel:" + (msg.phoneNumber && msg.phoneNumber.length > 0 ? msg.phoneNumber[0] : ''),'_blank');
            }
        }
    }
}
export const ActionService = new ActionServiceClass();