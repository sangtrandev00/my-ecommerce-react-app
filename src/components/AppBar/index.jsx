            import * as React from 'react';
            import AppBar from '@mui/material/AppBar';
            import Box from '@mui/material/Box';
            import Toolbar from '@mui/material/Toolbar';
            import IconButton from '@mui/material/IconButton';
            import Typography from '@mui/material/Typography';
            import Menu from '@mui/material/Menu';
            import MenuIcon from '@mui/icons-material/Menu';
            import Container from '@mui/material/Container';
            import Avatar from '@mui/material/Avatar';
            // import Button from '@mui/material/Button';
            import Tooltip from '@mui/material/Tooltip';
            import MenuItem from '@mui/material/MenuItem';
            import AdbIcon from '@mui/icons-material/Adb';
            import { Link } from 'react-router-dom';
            import { useDispatch, useSelector } from 'react-redux';
            import { logout } from '../../store/userSlice';
            import { useEffect, useState } from 'react';
            import { onAuthStateChanged, signOut } from 'firebase/auth';
            import { auth } from '../../firebase/firebase-config';

            const pages = ['Products', 'Pricing', 'Blog'];
            const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

            function AppBarComponent() {
              const [anchorElNav, setAnchorElNav] = React.useState(null);
              const [anchorElUser, setAnchorElUser] = React.useState(null);
              
              const dispatch = useDispatch();
              const [userInfo, setUserInfo] = useState("");
              const user = useSelector((state) => state.user);
              
              useEffect(() => {
                const unsubscribe = onAuthStateChanged(auth, (currentUser) => {

                  if (currentUser) {
                    setUserInfo(currentUser);
                  } else {
                    setUserInfo("");
                  }
                });
                return unsubscribe;
              }, [userInfo])

              const handleOpenNavMenu = (event) => {
                setAnchorElNav(event.currentTarget);
              };
              const handleOpenUserMenu = (event) => {
                setAnchorElUser(event.currentTarget);
              };

              const handleCloseNavMenu = () => {
                setAnchorElNav(null);
              };

              const handleCloseUserMenu = () => {
                setAnchorElUser(null);
              };

              const clickHandler = (e) => {
                e.preventDefault();

                console.log(e.target.textContent);

                if(e.target.textContent == "Logout") {
                  dispatch(logout());

                  // Logout Here!!!
                  signOut(auth).then(() => {

                    console.log("sign out successfully!");

                    // After signout
                    console.log(user);
                  }).catch((error) => {
                    console.log("error: ", error);
                  })

                }

              }
              return (
                // App bar is higher order component
                <AppBar position="static" >
                  <Container maxWidth="lg">
                    <Toolbar disableGutters>
                      <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                      <Link to="/">
                      <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        sx={{
                          mr: 2,
                          display: { xs: 'none', md: 'flex' },
                          fontFamily: 'monospace',
                          fontWeight: 700,
                          letterSpacing: '.3rem',
                          color: 'inherit',
                          textDecoration: 'none',
                        }}
                      >
                        LOGO
                      </Typography>
                      </Link>

                      <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                          size="large"
                          aria-label="account of current user"
                          aria-controls="menu-appbar"
                          aria-haspopup="true"
                          onClick={handleOpenNavMenu}
                          color="inherit"
                        >
                          <MenuIcon />
                        </IconButton>
                        <Menu
                          id="menu-appbar"
                          anchorEl={anchorElNav}
                          anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                          }}
                          keepMounted
                          transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                          }}
                          open={Boolean(anchorElNav)}
                          onClose={handleCloseNavMenu}
                          sx={{
                            display: { xs: 'block', md: 'none' },
                          }}
                        >
                          {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                          ))}
                        </Menu>
                      </Box>
                      <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                      <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                          mr: 2,
                          display: { xs: 'flex', md: 'none' },
                          flexGrow: 1,
                          fontFamily: 'monospace',
                          fontWeight: 700,
                          letterSpacing: '.3rem',
                          color: 'inherit',
                          textDecoration: 'none',
                        }}
                      >
                        LOGO
                      </Typography>
                      <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {/* {pages.map((page) => (
                          <Button
                            key={page}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                          >
                            {page}
                          </Button>
                        ))} */}
                        <Link to="shop" className="ml-3">Products</Link>
                        <Link to="blog" className="ml-3">Blog</Link>
                        <Link to="about" className="ml-3">About Us</Link>
                        <Link to="contact" className="ml-3">Contact</Link>
                        <Link to="viewcart" className="ml-3">ViewCart</Link>
                        <Link to="wishlist" className="ml-3">Wishlist</Link>
                        <Link to="checkout" className="ml-3">Checkout</Link>
                      </Box>
                      {!userInfo && <Link className="cursor-pointer" to="/login">Login</Link>}
                      {userInfo && <Typography className="px-3">{userInfo.displayName}</Typography>}
                      {userInfo && <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <Avatar alt="Remy Sharp" src={userInfo.photoURL} />
                          </IconButton>
                        </Tooltip>
                        <Menu
                          sx={{ mt: '45px' }}
                          id="menu-appbar"
                          anchorEl={anchorElUser}
                          anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                          }}
                          keepMounted
                          transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                          }}
                          open={Boolean(anchorElUser)}
                          onClose={handleCloseUserMenu}
                        >
                          {settings.map((setting) => (
                            <MenuItem key={setting} onClick={handleCloseUserMenu}>
                              <Link onClick={clickHandler} to={setting}>
                                <Typography textAlign="center">{setting}</Typography>
                              </Link>
                            </MenuItem>
                          ))}
                        </Menu>
                      </Box>
            }
                    </Toolbar>
                  </Container>
                </AppBar>
              );
            }
            export default AppBarComponent;
