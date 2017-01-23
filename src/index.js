import parseCapabilities from 'desired-capabilities';
import { /*createDevice,*/ getDevices, openUrl, /*shutdown*/ } from 'node-simctl';
// var simctl = require('simctl');
var shell = require('shelljs');

export default {
    // Multiple browsers support
    isMultiBrowser: false,

    //UDID of the device currently running the test
    chosenDevice: null,

    // Required - must be implemented
    // Browser control
    async openBrowser (id, pageUrl, browserName) {
        var browserDetails = this._getBrowserDetails(browserName);
        var device = this._getDeviceFromDetails(browserDetails);

        this.chosenDevice = device.udid;
        this._log('Acquired device ' + device.name + ' running on ' + device.sdk);
        // this.udid = await createDevice('test', chosenDevice.name, browserDetails.platform);
        // await simExec('boot', 0 [chosenDevice]);

        //if (device.state !== 'Booted') {
            //this._log('Device was not booted - booting now');
            //simctl.boot(this.chosenDevice);
        //}

        var command = 'open /Applications/Xcode.app/Contents/Developer/Applications/Simulator.app --args -CurrentDeviceUDID ' + device.udid;

        shell.exec(command);

        this._log('Device booted - launching URL');
        openUrl(this.chosenDevice, pageUrl);
    },

    async closeBrowser (/*id*/) {
        // this._log('Job done - shutting down device');
        // shutdown(this.chosenDevice);
    },


    // Optional - implement methods you need, remove other methods
    // Initialization
    async init () {
        await this._getAvailableDevices();
    },

    // Browser names handling
    async getBrowserList () {
        return getDevices();
    },

    async isValidBrowserName (browserName) {
        var browserDetails = this._getBrowserDetails(browserName);

        return this._getDeviceFromDetails(browserDetails) !== null;
    },


    // Extra methods
    async resizeWindow (/* id, width, height, currentWidth, currentHeight */) {
        this.reportWarning('The window resize functionality is not supported by the "fbsimctl" browser provider.');
    },

    async takeScreenshot (/* id, screenshotPath, pageWidth, pageHeight */) {
        this.reportWarning('The screenshot functionality is not currently supported by the "fbsimctl" browser provider.');
    },

    _getBrowserDetails (browserName) {
        return parseCapabilities(browserName)[0];
    },

    async _getAvailableDevices () {
        this.availableDevices = await getDevices();
        // var av2 = simctl.list();
        
        // console.dir(av2);
        // console.log('');
    },

    _getDeviceFromDetails (browserDetails) {

        //If the user hasn't specified a platform, find all the available ones and choose the newest
        if (browserDetails.platform === 'any') {
            var platforms = Object.keys(this.availableDevices);

            platforms.sort();
            browserDetails.platform = platforms[0];
        }

        var devicesOnPlatform = this.availableDevices[browserDetails.platform];
        var devices = devicesOnPlatform.filter(device => {
            return device.name.toLowerCase() === browserDetails.browserName.toLowerCase();
        });

        if (!devices.length)
            return null;

        return devices[0];
    },

    _log (message) {
        console.log(message);
    }
};
