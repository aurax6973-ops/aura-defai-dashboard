let provider;
let signer;
let userAddress;

const auraTokenAddress =
"0xdacC032F3316E2b04B3E0fFd6BCE661Cc4e30419";

const stakingManagerAddress =
"0x2F9E497Eb3f11c7c286874B08b543e8f2c300f45";

const referralRegistryAddress =
"0x2a359Fbbc7269313d81d4fB6d0Bd1f394671186d";

const connectBtn =
document.getElementById("connectWalletBtn");

const approveBtn =
document.getElementById("approveBtn");

const stakeBtn =
document.getElementById("stakeBtn");

const createCodeBtn =
document.getElementById("createCodeBtn");

const registerRefBtn =
document.getElementById("registerRefBtn");

async function connectWallet(){

if(!window.ethereum)
return alert("Install MetaMask");

const accounts=await ethereum.request({
method:"eth_requestAccounts"
});

userAddress=accounts[0];

provider =
new ethers.providers.Web3Provider(window.ethereum);

signer = provider.getSigner();

document.getElementById("walletAddress").innerText =
userAddress;

fetchUserData();
}

async function fetchUserData(){

const staking = new ethers.Contract(
stakingManagerAddress,
stakingAbi,
provider
);

const balance =
await staking.getSelfStakingUSDT(userAddress);

document.getElementById("selfStakedAmount").innerText =
balance.toString()+" USDT";
}

async function approveTokens(){

const amount =
document.getElementById("stakeAuraInput").value;

const token =
new ethers.Contract(
auraTokenAddress,
auraTokenAbi,
signer
);

const tx =
await token.approve(stakingManagerAddress,amount);

await tx.wait();

alert("Approved Successfully");
}

async function executeStake(){

const auraAmt =
document.getElementById("stakeAuraInput").value;

const usdtVal =
document.getElementById("stakeUsdtInput").value;

const staking =
new ethers.Contract(
stakingManagerAddress,
stakingAbi,
signer
);

const tx =
await staking.stake(auraAmt,usdtVal);

await tx.wait();

alert("Stake Successful");

fetchUserData();
}

async function createReferral(){

const referral =
new ethers.Contract(
referralRegistryAddress,
referralAbi,
signer
);

const tx =
await referral.createMyReferralCode();

await tx.wait();

alert("Referral Created");
}

async function registerReferral(){

const code =
document.getElementById("refCodeInput").value;

const referral =
new ethers.Contract(
referralRegistryAddress,
referralAbi,
signer
);

const tx =
await referral.registerUserWithCode(code);

await tx.wait();

alert("Referral Registered");
}

function startRebaseCountdown(){

function update(){

const now=Math.floor(Date.now()/1000);

const cycle=21600;

const next=Math.ceil(now/cycle)*cycle;

const remain=next-now;

const h=Math.floor(remain/3600);
const m=Math.floor((remain%3600)/60);
const s=remain%60;

document.getElementById("rebaseTimer").innerText=
`${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
}

update();
setInterval(update,1000);
}

startRebaseCountdown();

connectBtn.onclick=connectWallet;
approveBtn.onclick=approveTokens;
stakeBtn.onclick=executeStake;
createCodeBtn.onclick=createReferral;
registerRefBtn.onclick=registerReferral;
// Sidebar Toggle

const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");

menuBtn.addEventListener("click", () => {
    sidebar.classList.toggle("hidden");
});