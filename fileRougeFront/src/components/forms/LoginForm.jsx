function LoginForm({ onClose }) {
    return (
      <>
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <input type="text" placeholder="Email" className="w-full mb-3 p-2 border rounded" />
        <input type="password" placeholder="Password" className="w-full mb-3 p-2 border rounded" />
        <button className="bg-black text-white px-4 py-2 rounded w-full hover:bg-red-700">Login</button>
        <button onClick={onClose} className="mt-2 text-sm text-red-500 hover:underline">Close</button>
      </>
    );
 }

  export default LoginForm;
  