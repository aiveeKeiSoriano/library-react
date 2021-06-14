import { Button, CircularProgress, makeStyles, Paper, TextField, Typography } from "@material-ui/core";
import { useState } from "react";
import { useHistory } from "react-router";

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

export default function SignUp() {

    let history = useHistory()

    let classes = useStyles()

    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [confirmPass, setConfirmPass] = useState()
    const [image, setImage] = useState()
    const [loading, setLoading] = useState(false)

    const [nameError, setNameError] = useState([false, ''])
    const [emailError, setEmailError] = useState([false, ''])
    const [passwordError, setPasswordError] = useState([false, ''])
    const [confirmPassError, setConfirmPassError] = useState([false, ''])

    const [error, setError] = useState('')

    let submitForm = async (e) => {
        setLoading(true)
        let formData = new FormData()
        formData.append('name', name)
        formData.append('email', email)
        formData.append('password', password)
        if (image) formData.append('picture', image)

        let response = await fetch("http://localhost:3300/auth/signup", {
            method: "POST",
            body: formData
        })

        let result = await response.json()
        if (response.status === 201) {
            history.push('/login')
            setError('')
        }
        else {
            if (result.message.match("ErrorE11000 duplicate key error collection: library.users index: email_1 dup key: { email:")) {
                setError("Email already exist")
            }
            else {
                setError(result.message)
            }
        }
        console.log(result)
        setLoading(false)
    }

    return (
        <Paper elevation={2} className={classes.container}>
            <Typography variant="h4" align='center'>Sign Up</Typography>
            <Typography variant="subtitle2" align='center' color='error'>{error}</Typography>
            <TextField label="Name *" variant="outlined" name="name" value={name}
                error={nameError[0]} helperText={nameError[1]}
                onChange={(e) => {
                    setName(e.target.value)
                    if (e.target.value === '') setNameError([true, 'This field cannot be empty'])
                    else setNameError([false, ''])
            }}/>
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
            <TextField label="Confirm Password *" variant="outlined" type="password" value={confirmPass}
                error={confirmPassError[0]} helperText={confirmPassError[1]}
                onChange={(e) => {
                    setConfirmPass(e.target.value)
                    if (e.target.value !== password) setConfirmPassError([true, 'Passwords do not match'])
                    else setConfirmPassError([false, ''])
                }} />
            <input accept="image/*" id="picture" value={''} className={classes.input} type="file" name="picture" onChange={(e) => setImage(e.target.files[0])} />
            <label htmlFor="picture" style={{display: "flex", gap: "10px", alignItems: "center"}}>
                <Button variant="contained" color="primary" component="span">Upload Avatar</Button>
                {image?.name}
            </label>
            {loading ? 
                <CircularProgress size={28} style={{width: '100%', display: 'flex', justifyContent: 'center'}}/>
                : <Button variant="contained" color="primary" disabled={ nameError[0] || emailError[0] || passwordError[0] || confirmPassError[0]} onClick={submitForm}>Submit</Button>
            }
        </Paper>
    )
}