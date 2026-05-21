// Spawns StudyFlowLockHost.exe --hook (same Alt+Tab block as Chrome PC Lock)
const { spawn, execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

function sleepMs(ms) {
  const end = Date.now() + ms;
  while (Date.now() < end) { /* sync wait for hook pid file */ }
}

const TMP = os.tmpdir();
const PID_PATH = path.join(TMP, 'studyflow-lock.pid');
const UNLOCK_PATH = path.join(TMP, 'studyflow-lock.unlock');
const SHIELD_FLAG = path.join(TMP, 'studyflow-shield.on');

function resolveLockExe(appRoot) {
  const candidates = [
    path.join(appRoot, 'native-lock', 'StudyFlowLockHost.exe'),
    path.join(appRoot, '..', 'native-lock', 'StudyFlowLockHost.exe')
  ];
  for (const p of candidates) {
    if (fs.existsSync(p)) return p;
  }
  return null;
}

function isHookRunning() {
  try {
    if (!fs.existsSync(PID_PATH)) return false;
    const pid = parseInt(fs.readFileSync(PID_PATH, 'utf8').trim(), 10);
    if (!pid) return false;
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}

function startHook(lockExe) {
  if (!lockExe || !fs.existsSync(lockExe)) {
    return { ok: false, error: 'StudyFlowLockHost.exe not found — run Build-Desktop.ps1 first' };
  }
  if (isHookRunning()) {
    return { ok: true, locked: true, detail: 'already_running' };
  }
  try {
    if (fs.existsSync(UNLOCK_PATH)) fs.unlinkSync(UNLOCK_PATH);
  } catch (_) {}
  try {
    fs.writeFileSync(SHIELD_FLAG, '1', 'ascii');
  } catch (_) {}
  const child = spawn(lockExe, ['--hook'], {
    detached: true,
    stdio: 'ignore',
    windowsHide: true,
    cwd: path.dirname(lockExe)
  });
  child.unref();
  for (let i = 0; i < 30; i++) {
    if (isHookRunning()) return { ok: true, locked: true, detail: 'hook_started' };
    sleepMs(100);
  }
  return { ok: false, locked: false, error: 'hook_start_failed' };
}

function stopHook() {
  try {
    if (fs.existsSync(SHIELD_FLAG)) fs.unlinkSync(SHIELD_FLAG);
  } catch (_) {}
  try {
    fs.writeFileSync(UNLOCK_PATH, '1', 'ascii');
  } catch (_) {}
  const deadline = Date.now() + 2000;
  while (Date.now() < deadline && isHookRunning()) {
    sleepMs(150);
  }
  if (isHookRunning()) {
    try {
      const pid = parseInt(fs.readFileSync(PID_PATH, 'utf8').trim(), 10);
      if (pid) process.kill(pid);
    } catch (_) {}
  }
  try {
    if (fs.existsSync(PID_PATH)) fs.unlinkSync(PID_PATH);
  } catch (_) {}
  try {
    if (fs.existsSync(UNLOCK_PATH)) fs.unlinkSync(UNLOCK_PATH);
  } catch (_) {}
  return { ok: true, locked: false, detail: 'unlocked' };
}

function getStatus(lockExe) {
  const running = isHookRunning();
  const hasExe = !!(lockExe && fs.existsSync(lockExe));
  return {
    installed: hasExe,
    ok: hasExe,
    locked: running,
    error: hasExe ? null : 'lock_host_missing'
  };
}

function compileLockHostIfNeeded(appRoot) {
  const cs = path.join(appRoot, 'native-lock', 'StudyFlowLockHost.cs');
  const exe = path.join(appRoot, 'native-lock', 'StudyFlowLockHost.exe');
  if (fs.existsSync(exe)) return exe;
  if (!fs.existsSync(cs)) return null;
  const ps1 = path.join(appRoot, 'native-lock', 'Compile-StudyFlowLock.ps1');
  if (!fs.existsSync(ps1)) return null;
  try {
    execSync(`powershell -NoProfile -ExecutionPolicy Bypass -File "${ps1}"`, {
      cwd: path.dirname(ps1),
      stdio: 'pipe',
      windowsHide: true
    });
  } catch (_) {
    return null;
  }
  return fs.existsSync(exe) ? exe : null;
}

module.exports = {
  resolveLockExe,
  compileLockHostIfNeeded,
  startHook,
  stopHook,
  getStatus,
  isHookRunning
};
