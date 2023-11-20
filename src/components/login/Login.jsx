import { useContext, useEffect, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { useGlobalAuthContext } from '../../hooks';
import './Login.css';

const Login = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate()

  const {dispatch, currentUser} = useGlobalAuthContext()

  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch({type:"LOGIN", payload:user})
        // setIsLoggedIn(currentUser)
        navigate("/admin/manageArticles")
      })
      .catch((error) => {
        setError(true);
      });
  };

  const handleLogout = (e) => {
    e.preventDefault();
    
    dispatch({type:"LOGOUT"})
    navigate("/")
  }

  return (
    <>
      {!currentUser ? (
        <div className="login">
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
            {error && <span>{error}</span>}
          </form>
        </div>
      ) :
      (<div className="logout">
        <h2>ADMIN</h2>
        <button onClick={handleLogout}>Log Out</button>
        </div>)
      }
    </>
  );
};

export default Login;











// const Login = () => {
//     // const {
//     //     formData,
//     //     errors,
//     //     handleChange,
//     //     handleSubmit
//     // } = useLoginForm();

//     const navigate = useNavigate();

// 	const { login } = useGlobalAuthContext();

// 	const [formData, setFormData] = useState({
// 		name: '',
// 		password: '',
// 	});

// 	const [errors, setErrors] = useState({
// 		name: null,
// 		password: null,
// 	});

// 	const handleChange = (e) => {
// 		setFormData({
// 			...formData,
// 			[e.target.name]: e.target.value,
// 		});

// 		setErrors((prevState) => ({
// 			...prevState,
// 			[e.target.name]: null,
// 		}));
// 	};

// 	const handleSubmit = (e) => {
// 		e.preventDefault();

// 		let isValid = true;

// 		const newErrors = {};

// 		if (formData.name.length < 3) {
// 			newErrors.name = 'name must bo at least 3 characters long';
// 			isValid = false;
// 		}
// 		if (formData.password.length < 6) {
// 			newErrors.password = 'password must bo at least 6 characters long';
// 			isValid = false;
// 		}

// 		setErrors(newErrors);

// 		if (isValid) {
// 			login(formData);
// 			navigate('/');
// 		}
// 	};


//     const fields = [
//         {
//             id: 1,
//             name: 'User Name',
//             inputName: 'name',
//             value: formData.name,
//             type: 'text',
//             error: errors.name
//         },
//         {
//             id: 2,
//             name: 'Password',
//             inputName: 'password',
//             value: formData.password,
//             type: 'password',
//             error: errors.password
//         },
//     ];

//     return (
//         <section className="single-column-container">
//             <h2>Log In</h2>
//             <form onSubmit={handleSubmit}>
//                 {fields.map(field => (
//                     <Input key={field.id} {...field} handleChange={handleChange} />
//                 ))}
//                 <p className="login-info">for admin permissions please contact me via <a href="mailto:obrm770@gmail.com">email</a>.</p>
//                 <button className="btn update-btn" type="submit">Log In</button>
//             </form>
//         </section>
//     )
// }

// export default Login;
