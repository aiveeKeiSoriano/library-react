import { AppBar, Button, Container, CssBaseline, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, ListSubheader, makeStyles, Toolbar, Typography } from "@material-ui/core";
import { Book, Category, Menu, MenuBook, People } from "@material-ui/icons";
import { useState } from "react";
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom'
import BooksList from "./BooksList";
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
    return (
        <Router>
            <Wrapper>
                <Switch>
                    <Route exact path='/'>
                        <h1>Welcome to Library</h1>
                    </Route>
                    <Route path='/books'>
                        <BooksList />
                    </Route>
                    <Route path='/categories'>
                        <h1>List of Categories</h1>
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
                </Switch>
            </Wrapper>
        </Router>
    )

}

function Wrapper(props) {

    const classes = useStyles();

    let [drawerOpen, setDrawerOpen] = useState(false)

    let toggleDrawer = () => {
        setDrawerOpen(p => !p)
    }

    return (
        <div className="container">
            <CssBaseline />
            <AppBar position='static'>
                <Toolbar>
                    <IconButton edge='start' className={classes.menuButton} color='inherit' onClick={toggleDrawer}>
                        <Menu />
                    </IconButton>
                    <Typography variant='h6' className={classes.title}>
                        McLaren College Library
                    </Typography>
                    <Button color='inherit'>Login</Button>
                </Toolbar>
            </AppBar>
            <>
                <Drawer anchor='left' open={drawerOpen} onClose={toggleDrawer}>
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
                                <ListItem button className={classes.list} onClick={toggleDrawer}>
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