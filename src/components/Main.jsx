import { AppBar, Button, Container, CssBaseline, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, ListSubheader, makeStyles, Toolbar, Typography } from "@material-ui/core";
import { Book, Category, Menu, MenuBook, People } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { Link, Switch, Route, useHistory } from 'react-router-dom'
import { toggleDrawer } from "../redux/actions/actions";
import initAxios from "../networksUtils/interceptors";
import BooksList from "./BooksList";
import Categories from "./Categories";
import LogIn from "./Login";
import SignUp from "./SignUp";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    list: {
        width: 250,
    },
    fullList: {
        marginTop: theme.spacing(2),
        width: 'auto',
    },
    menuHeader: {
        color: 'inherit',
        fontSize: '1.5rem',
        marginBottom: theme.spacing(2)
    },
    container: {
        display: 'flex',
        justifyContent: 'center'
    }
}));


export default function Main() {

    let history = useHistory()
    initAxios(history)

    return (
            <Wrapper>
                <Switch>
                    <Route exact path='/'>
                        <h1>Welcome to Library</h1>
                    </Route>
                    <Route path='/books'>
                        <BooksList />
                    </Route>
                    <Route path='/categories'>
                        <Categories />
                    </Route>
                    <Route path='/members'>
                        <h1>List of members</h1>
                    </Route>
                    <Route path='/issues'>
                        <h1>List of Issued Books</h1>
                    </Route>
                    <Route path='/signup'>
                        <SignUp />
                    </Route>
                    <Route path='/login'>
                        <LogIn />
                    </Route>
                </Switch>
            </Wrapper>
    )

}

function Wrapper(props) {

    const classes = useStyles();

    let drawerOpen = useSelector(state => state.main.drawer)
    let dispatch = useDispatch()

    return (
        <div className="container">
            <CssBaseline />
            <AppBar position='static'>
                <Toolbar>
                    <IconButton edge='start' className={classes.menuButton} color='inherit' onClick={() => dispatch(toggleDrawer())}>
                        <Menu />
                    </IconButton>
                    <Typography variant='h6' className={classes.title}>
                        McLaren College Library
                    </Typography>
                    <Link to='login' style={{ textDecorationLine: 'none', color: 'white' }}>
                        <Button color='inherit'>Login</Button>
                    </Link>
                </Toolbar>
            </AppBar>
            <>
                <Drawer anchor='left' open={drawerOpen} onClose={() => dispatch(toggleDrawer())}>
                    <List className={classes.fullList}>
                        <ListSubheader className={classes.menuHeader} component="div" >
                            <Typography variant='h5' align='center' color='primary'>Menu</Typography>
                        </ListSubheader>
                        {[
                            { text: 'Books', icon: <Book />, link: "/books" },
                            { text: 'Categories', icon: <Category />, link: "/categories" },
                            { text: 'Members', icon: <People />, link: "/members" },
                            { text: 'Book Issued', icon: <MenuBook />, link: "/issues" },
                        ].map(({ text, icon, link }) => (
                            <Link key={text} to={link} style={{ textDecorationLine: 'none', color: 'black' }}>
                                <ListItem button className={classes.list} onClick={() => dispatch(toggleDrawer())}>
                                    <ListItemIcon>{icon}</ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItem>
                            </Link>
                        ))}
                    </List>
                </Drawer>
            </>
            <Container className={classes.container}>
                {props.children}
            </Container>
        </div>
    )
}