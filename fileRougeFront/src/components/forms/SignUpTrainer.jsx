function SignUpTrainer({ onClose }) {
    return (
      <>
        <h2 className="text-xl font-bold mb-4">Sign Up (Trainer)</h2>
        <input type="text" placeholder="Name" className="w-full mb-3 p-2 border rounded" />
        <input type="email" placeholder="Email" className="w-full mb-3 p-2 border rounded" />
        <input type="text" placeholder="Experience" className="w-full mb-3 p-2 border rounded" />
        <input type="password" placeholder="Password" className="w-full mb-3 p-2 border rounded" />
        <button className="bg-black text-white px-4 py-2 rounded w-full hover:bg-red-700">Register</button>
        <button onClick={onClose} className="mt-2 text-sm text-red-500 hover:underline">Close</button>
      </>
    );
}
  
export default SignUpTrainer;
//   