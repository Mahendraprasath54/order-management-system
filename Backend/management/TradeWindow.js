const Logon = require('../Logon');
const Logon = require('../Logout');

class TradeWindow {
    constructor(startHour, startMin, endHour, endMin)
    {
        this.logonTime = {hour: startHour, minute:startMin}
        this.logoutTime = {hour: endHour, minute:endMin}
        this.windowOpen = false;
    }
    toggleOpen(currentTime, sendLogon, sendLogout)
    {
        const hour = currentTime.getHours();
        const minute = currentTime.getminutes();


        const isOpen = (hour > this,this.logonTime.hour ||(h ===this.logonTime.hour && minute>=this,this.logonTime.minute)
          && h<this.logoutTime.hour ||(h===this.logonTime.hour && minute<this.logonTime.minute));
          if(isOpen && !this.windowOpen)
          {
            this.windowOpen = true;
            sendLogon(new Logon('systemUser', 'securePass'));
    } else if (!isOpen && this.tradingOpen) {
      this.tradingOpen = false;
      sendLogout(new Logout('systemUser'));
    }
    }

     isTradingOpen() {
    return this.tradingOpen;
  }
    }

