import React, { useContext } from "react";
import { firebaseAuth } from "../../index";
import { signOut } from "firebase/auth";
import { Chart } from "./Charts/Chart";
import { StoreContext } from "../../StoreProvider";
//materail UI
import { Typography, Box, AppBar, Toolbar, IconButton, Avatar, Grid } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import HistoryList from "./HistoryList/HistoryList";
import { theme } from "../../theme/theme";
import { Form } from "./Form/Form";
import { Footer } from "./Footer/Footer";

export const MainView: React.FC = () => {
    const navigate = useNavigate();
    const { username, operation, incomeCategories, expenseCategories } = useContext(StoreContext);

    const onLogout = async (): Promise<void> => {
        await signOut(firebaseAuth);
        navigate("/signin");
    };

    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "100vh",
                }}
            >
                <AppBar position="sticky">
                    <Toolbar
                        sx={{
                            pr: "24px", // right padding
                        }}
                    >
                        <IconButton>
                            <Avatar alt="User avatar" sx={{ backgroundImage: "./logo.png" }} />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1 }}
                        >
                            Cześć {username}!
                        </Typography>
                        <IconButton color="inherit" onClick={onLogout}>
                            Wyloguj
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Box
                    sx={{
                        minWidth: "1040px",
                    }}
                >
                    <Grid
                        container
                        columns={4}
                        spacing={1}
                        direction="row"
                        justifyContent="center"
                        alignItems="flex-start"
                    >
                        <Grid item xs={6} sm={1}>
                            <Chart
                                categoryName="Income"
                                operations={operation}
                                Incomes={incomeCategories}
                                Expenses={expenseCategories}
                            />
                        </Grid>
                        <Grid item xs={12} sm={2} justifyContent="center" alignItems="center">
                            <Form />
                        </Grid>
                        <Grid item xs={6} sm={1}>
                            <Chart
                                categoryName="Expense"
                                operations={operation}
                                Incomes={incomeCategories}
                                Expenses={expenseCategories}
                            />
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        spacing={1}
                        columns={4}
                        direction="row"
                        justifyContent="center"
                        alignItems="flex-start"
                    >
                        <Grid item xs={12} sm={2} justifyContent="center" alignItems="center">
                            {operation.length > 0 && <HistoryList />}
                        </Grid>
                    </Grid>
                </Box>
                <Footer />
            </Box>
        </ThemeProvider>
    );
};
