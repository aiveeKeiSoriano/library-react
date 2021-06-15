import { Button, CircularProgress, Dialog, DialogTitle, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, makeStyles, Paper, Snackbar, Typography } from "@material-ui/core"
import { Delete } from "@material-ui/icons"
import { Alert } from "@material-ui/lab"
import axios from "axios"
import { useEffect, useState } from "react"

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        marginTop: theme.spacing(3),
        width: '500px',
    },
    header: {
        padding: theme.spacing(2),
        paddingBottom: theme.spacing(0)
    },
    deleteDialog: {
        padding: theme.spacing(2),
    }
}))

export default function Categories() {

    let classes = useStyles()

    let [loading, setLoading] = useState(true)
    let [categories, setCategories] = useState([])
    let [deleteDialog, setDeleteDialog] = useState(false)
    let [id, setID] = useState(null)
    let [deleting, setDeleting] = useState(false)
    let [deleted, setDeleted] = useState([false, '', 'success'])

    const url = 'http://localhost:3300/categories/'

    let getCategories = async () => {
        let response = await axios.get('/categories')
        let data = response.data
        if (response.status === 200) {
            setCategories(data)
        }
        else console.log(data.message)
        setLoading(false)
}

useEffect(() => {
    getCategories()
    // eslint-disable-next-line
}, [])

let toggleDeleteDialog = () => setDeleteDialog(p => !p)

let deleteCategory = async () => {
    setDeleting(true)
    let response = await fetch(url + id, { method: 'DELETE' })
    setDeleting(false)
    toggleDeleteDialog()
    if (response.status === 201) {
        setDeleted([true, 'Deleted Successfully!', 'success'])
        getCategories()
    }
    else {
        setDeleted([true, 'Something Went Wrong', 'error'])
    }
}

return (
    <Paper elevation={3} className={classes.paper}>
        <Dialog onClose={toggleDeleteDialog} open={deleteDialog} className={classes.deleteDialog}>
            <DialogTitle>Do you want to delete?</DialogTitle>
            <div className="buttons" style={{ display: 'flex', gap: '1em', justifyContent: 'center', padding: '0em 1em 1em 1em' }}>
                <Button variant='contained' color='primary' onClick={deleteCategory} disabled={deleting}>Yes</Button>
                <Button variant='contained' color='default' onClick={toggleDeleteDialog} disabled={deleting}>No</Button>
            </div>
        </Dialog>
        <Snackbar open={deleted[0]} autoHideDuration={2000} onClose={() => setDeleted([false, '', 'success'])}>
            <Alert elevation={6} variant="filled" onClose={() => setDeleted([false, '', 'success'])} severity={deleted[2]}>
                {deleted[1]}
            </Alert>
        </Snackbar>
        <Typography align='center' variant='h5' className={classes.header}>List of Categories</Typography>
        {loading ? <CircularProgress />
            : <List>
                {categories.map((category) => <ListItem key={category._id}>
                    <ListItemText primary={category.name} />
                    <ListItemSecondaryAction>
                        <IconButton edge="end" onClick={() => {
                            toggleDeleteDialog()
                            setID(category._id)
                        }
                        }>
                            <Delete />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>)}
            </List>}
    </Paper>
)
}