import { Button, makeStyles, Paper, TextField, Typography } from "@material-ui/core";
import { useState } from "react";

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

    let classes = useStyles()
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [confirmPass, setConfirmPass] = useState()
    const [image, setImage] = useState()
    const [loading, setLoading] = useState(false)

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

        if (response.status !== 201) {
            console.log(await response.text())
            setLoading(false);
            return
        }
        
        let result = await response.json()
        console.log(result)
        setLoading(false)
    }

    return (
        <Paper elevation={2} className={classes.container}>
            <Typography variant="h4" align='center'>Sign Up</Typography>
            <TextField label="Name *" variant="outlined" name="name" value={name} onChange={(e) => setName(e.target.value)}/>
            <TextField label="Email *" variant="outlined" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <TextField label="Password *" variant="outlined" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <TextField label="Confirm Password *" variant="outlined" type="password" value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)}/>
            <input accept="image/*" id="picture" className={classes.input} type="file" name="picture" onChange={(e) => setImage(e.target.files[0])} />
            <label htmlFor="picture" style={{display: "flex", gap: "10px", alignItems: "center"}}>
                <Button variant="contained" color="primary" component="span">Upload Avatar</Button>
                {image?.name}
            </label>
            <Button variant="contained" color="primary" disabled={!name || !email || !password || password !== confirmPass || loading} onClick={submitForm}>Submit</Button>
        </Paper>
    )
}