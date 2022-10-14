import React from "react";

function ConnectWallet() {
  const [walletAddress, setWalletAddress] = React.useState(null);
  const [status, setStatus] = React.useState(null);

  const handleClick = async () => {
    if (window.ethereum) {
      console.log("detected");
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setStatus("Connected");
        setWalletAddress(accounts);
      } catch (error) {
        console.log("error");
      }
    } else {
      console.log("not detected");
    }
  };

  if (window.ethereum) {
    window.ethereum.on("accountsChanged", function (accounts) {
      setStatus("Network Changed");
      setWalletAddress(accounts[0]);
    });
  }

  return (
    <div className="flex h-screen">
      <div className="m-auto">
        {walletAddress ? (
          <div className="border border-gray-200 pt-16 pb-16 pr-10 pl-10 rounded-xl shadow-md">
            <div className="text-green-600 font-bold text-3xl pb-5">
              {status}
            </div>
            <div className="text-gray-400 pb-3 font-semibold">
              Current Address
            </div>
            <div className="font-semibold">{walletAddress}</div>
          </div>
        ) : (
          <button
            type="button"
            onClick={handleClick}
            className="rounded-md bg-gradient-to-r from-teal-400 to-blue-500 px-6 py-3 font-semibold text-white hover:from-pink-500 hover:to-orange-500"
          >
            Connect to wallet
          </button>
        )}
      </div>
    </div>
  );
}

export default ConnectWallet;
