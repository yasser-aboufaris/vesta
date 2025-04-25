function LoginForm({ onClose, setState }) {
    return (
      <>
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <input type="text" placeholder="Email" className="w-full mb-3 p-2 border rounded" />
        <input type="password" placeholder="Password" className="w-full mb-3 p-2 border rounded" />
        <button className="bg-black text-white px-4 py-2 rounded w-full hover:bg-red-700">Login</button>
        <div className="mt-4 flex justify-between text-sm">
          <button onClick={() => setState(2)} className="text-blue-500 hover:underline">Sign up (Client)</button>
          <button onClick={onClose} className="text-red-500 hover:underline">Close</button>
        </div>
      </>
    );
  }
  
  export default LoginForm;
  