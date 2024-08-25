import axios from "axios";
const userGuid = "USR-9f754902-70b1-456a-823a-405bd7db8c66";
const memberGuid = "MBR-e92b5bda-1645-4af1-adfb-8ab4f2f82e23";

export default function Balance() {
  const handleGetBalance = async () => {
    try {
      const { data } = await axios.post("/api/balance", {
        userGuid,
        memberGuid,
      });
      console.log({ data });
    } catch (e) {
      console.error("Error");
    }
  };
  return (
    <button
      className="p-2 bg-blue-500 text-white rounded-lg"
      onClick={handleGetBalance}
    >
      Check Balance
    </button>
  );
}
