// main.js

const serverUrl = "https://7l7zk4ee6c32.usemoralis.com:2053/server";
const appId = "#";
Moralis.start({ serverUrl, appId });

/** Add from here down */
async function login() {
  let user = Moralis.User.current();
  if (!user) {
   try {
      user = await Moralis.authenticate({ signingMessage: "Welcome to my Web3 game. Please sign the contract which is of 0 ETH. Any questions, contact me direct. Thanks tons." })
      console.log(user)
      console.log(user.get('ethAddress'))
   } catch(error) {
     console.log(error)
   }
  }
}

async function logOut() {
  await Moralis.User.logOut();
  console.log("logged out");
}


document.getElementById("btn-login").onclick = login;
document.getElementById("btn-logout").onclick = logOut;
