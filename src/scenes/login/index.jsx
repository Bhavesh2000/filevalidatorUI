// import React, { useState } from "react";
// import video from '../Assets/formBackgroundVIdeo.mp4';
// import "./LoginFileValidator.css";
// import MicrosoftLoginButton from "../MicrosoftLoginButton"; // Update this line


// const Login = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [errors, setErrors] = useState({});

//   const handleSubmit = (e) => {
//     e.preventDefault();
//   };

//   const handleUsernameChange = (e) => {
//     setUsername(e.target.value);
//     setErrors({ ...errors, username: "" });
//   };

//   const handlePasswordChange = (e) => {
//     setPassword(e.target.value);
//     setErrors({ ...errors, password: "" });
  
//     if (e.target.value.length === 0) {
//       return;
//     }
  
//     if (e.target.value.length < 8) {
//       setErrors({ ...errors, password: "Password must be at least 8 characters long." });
//     } else if (!/[a-z]/.test(e.target.value)) {
//       setErrors({ ...errors, password: "Password must contain at least one lowercase letter." });
//     } else if (!/[A-Z]/.test(e.target.value)) {
//       setErrors({ ...errors, password: "Password must contain at least one uppercase letter." });
//     } else if (!/[0-9]/.test(e.target.value)) {
//       setErrors({ ...errors, password: "Password must contain at least one digit." });
//     } else if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(e.target.value)) {
//       setErrors({ ...errors, password: "Password must contain at least one symbol." });
//     }
//   };

//   return (
//     <div className="login-file-validator">
//       <form onSubmit={handleSubmit} className="login-form">
//         <div className="background-video-container">
//           <video autoPlay muted loop className="background-video">
//             <source src={video} type="video/mp4" />
//           </video>
//         </div>
//         <label htmlFor="username" className="login-label">Username:</label>
//         <input
//           type="text"
//           id="username"
//           value={username}
//           onChange={handleUsernameChange}
//           required
//           className="login-input"
//         />
//         {errors.username && <p className="login-error">{errors.username}</p>}

//         <label htmlFor="password" className="login-label">Password:</label>
//         <input
//           type="password"
//           id="password"
//           value={password}
//           onChange={handlePasswordChange}
//           required
//           className="login-input"
//         />
//         {errors.password && <p className="login-error">{errors.password}</p>}
//         {/* <div className="forgot-password">
//     <a href="#">Forgot password?</a>
//   </div> */}
//         <button type="submit" className="login-button">Log in</button>
//       </form>
//       <MicrosoftLoginButton/>
//       <div className="footer-copyright">
//       Copyright by 8-Bit Coders
//       {/* <img src="https://see.fontimg.com/api/renderfont4/1GX3Z/eyJyIjoiZnMiLCJoIjo0OCwidyI6MTI1MCwiZnMiOjM4LCJmZ2MiOiIjRkZGRkZGIiwiYmdjIjoiIzM1M0Q0QiIsInQiOjF9/Q29weXJpZ2h0QnkgOiA4LUJpdCBDb2Rlcg/adulsa-script.png" alt="" srcset="" /> */}
//     </div>
//     </div>

//   );
// };

// export default Login;