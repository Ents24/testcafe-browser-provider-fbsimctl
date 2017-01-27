import { execSync } from 'child_process';
import path from 'path';
import loopWhileTrue from './loop-while-true';


const XCODE_PATH              = execSync('xcode-select -p').toString().trim();
const SERVICES_POLL_INTERVAL  = 500;
const SERVICES_POLL_TIMEOUT   = 15 * 60 * 1000;
const OPEN_URL_RETRY_INTERVAL = 500;


function _isServiceRunning (device) {
    var versionNumber   = Number(device.sdk.replace('iOS ', ''));
    var requiredService = versionNumber >= 9 ? 'com.apple.medialibraryd.xpc' : 'com.apple.springboard.carditemscontroller';
    var simctlCommand   = `xcrun simctl spawn ${device.udid} launchctl print system | grep -q 'A\\s*${requiredService}' && echo up || echo down`;

    return execSync(simctlCommand).toString().trim() === 'up';
}

export default async function start (device) {
    var simulatorPath = path.join(XCODE_PATH, 'Applications/Simulator.app');

    execSync(`open ${simulatorPath} --args -CurrentDeviceUDID ${device.udid}`);
    
    //Wait until the required services will be started on simulator 
    await loopWhileTrue(() => !_isServiceRunning(device), SERVICES_POLL_INTERVAL, SERVICES_POLL_TIMEOUT);

    //Sometimes, especially for first boot and last models, there is a time between the services was started,
    //and the device actually becomes available. So try to open a URL until it will succeed. 
    await loopWhileTrue(() => {
        try {
            //We can't use the test url here, because sometimes it gives the 'Browser was already connected' error.
            execSync(`xcrun simctl openurl ${device.udid} http://apple.com`, { stdio: 'ignore' });
        }
        catch (e) {
            return true;
        }

        return false;
    }, OPEN_URL_RETRY_INTERVAL);
}
