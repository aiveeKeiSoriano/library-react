import { Button, CircularProgress, makeStyles, Paper, TextField, Typography } from "@material-ui/core";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";

let useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        flexDirection: "column",
        gap: "1em",
        padding: "2em",
        marginTop: "2em",
        width: "100%",
        minWidth: "350px",
        maxWidth: "450px"
    },
    input: {
        display: "none"
    }
}))

export default function LogIn() {

    let history = useHistory()

    let classes = useStyles()

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [loading, setLoading] = useState(false)

    const [emailError, setEmailError] = useState([false, ''])
    const [passwordError, setPasswordError] = useState([false, ''])

    const [error, setError] = useState('')

    let submitForm = async (e) => {
        setLoading(true)
        let response = await fetch("http://localhost:3300/auth/login", {
            method: "POST",
            body: JSON.stringify( { email: email, password: password } ),
            headers: {
                "Content-Type" : "application/json"
            }
        })

        let result = await response.json()
        if (response.status === 200) {
            localStorage.setItem("access_token", result.access_token)
            history.push('/books')
            setError('')
        }
        else {
            setError(result.message)
        }
        console.log(result)
        setLoading(false)
    }

    return (
        <Paper elevation={2} className={classes.container}>
            <Typography variant="h4" align='center'>Log In</Typography>
            <Typography variant="subtitle2" align='center' color='error'>{error}</Typography>
            <TextField label="Email *" variant="outlined" name="email" type="email" value={email}
                error={emailError[0]} helperText={emailError[1]}
                onChange={(e) => {
                    setEmail(e.target.value)
                    let emailRegex = /.+@.+[.].+/
                    if (e.target.value === '' || !emailRegex.test(e.target.value)) setEmailError([true, 'Please enter a valid email'])
                    else setEmailError([false, ''])
                }} />
            <TextField label="Password *" variant="outlined" name="password" type="password" value={password}
                error={passwordError[0]} helperText={passwordError[1]}
                onChange={(e) => {
                    setPassword(e.target.value)
                    if (e.target.value === '') setPasswordError([true, 'This field cannot be empty'])
                    else setPasswordError([false, ''])
                }} />
            {loading ? 
                <CircularProgress size={28} style={{width: '100%', display: 'flex', justifyContent: 'center'}}/>
                : <Button variant="contained" color="primary" disabled={emailError[0] || passwordError[0]} onClick={submitForm}>Login</Button>
            }
            <Link to='/signup' style={{ textDecorationLine: 'none', color: 'black', alignSelf: 'center' }}>
                <Button color="primary" size='small'>No account yet? Sign up here</Button>
            </Link>
        </Paper>
    )
}