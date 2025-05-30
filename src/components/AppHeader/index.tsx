import { Grow, Box, Theme, Toolbar, Typography, Slide } from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { styled, useTheme } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { User } from "../../api/services/User/store";
import AvatarMenu from "../AvatarMenu";
import LanguageSelector from "../LanguageSelector";

interface AppBarProps extends MuiAppBarProps {
  theme?: Theme;
}

interface AppHeaderProps {
  user: User;
  pageTitle: string;
}

const typoStyle = {
  display: "flex",
  alignContent: "center",
  justifyContent: "center",
  lineHeight: 1,
};

const AppBar = styled(MuiAppBar)<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: theme.palette.common.black,
  color: theme.palette.common.white,
  height: theme.tokens.header.height,
}));

const AppHeader = React.forwardRef<HTMLDivElement, AppHeaderProps>(
  (props: AppHeaderProps, ref) => {
    const { user, pageTitle } = props;
    const { t } = useTranslation("app");
    const theme = useTheme();

    const [count, setCount] = useState(0);
    const hours = 1;
    const minutes = hours * 60;
    const seconds = minutes * 60;
    const countdown = seconds - count;
    const countdownMinutes = `${~~(countdown / 60)}`.padStart(2, "0");
    const countdownSeconds = (countdown % 60).toFixed(0).padStart(2, "0");
    {
      /* Timer bug
      Problem: Countdown timer interval wasn't being cleaned up, causing memory leaks
      Solution: Add cleanup function to clear the interval
      Reason: React components need to clean up resources when unmounting
    */
    }

    useEffect(() => {
      const interval = setInterval(() => {
        setCount((c) => c + 1);
      }, 1000);

      return () => clearInterval(interval);
    }, []);
    {
      /* Display avatar
      Problem: User avatar not displaying although user data being fetched
      Material-UI transition components weren't properly structured
      Solution:  Added loading state + Wrapped components in proper DOM elements
      Reason: The component was trying to render the avatar before the user data was available
    */
    }
    const [loadingApp, setLoadingApp] = useState(false);
    return (
      <Slide direction="down" in={!loadingApp} mountOnEnter unmountOnExit>
        <Box component="div">
          <AppBar ref={ref} position="fixed" sx={{ width: "100vw" }}>
            <Toolbar sx={{ background: "#08140C 0% 0% no-repeat padding-box" }}>
              <Box
                sx={{ width: "100%", flexDirection: "row", display: "flex" }}
              >
                <Box>
                  <Typography variant="h6" component="div" color="primary">
                    {countdownMinutes}:{countdownSeconds}
                  </Typography>
                </Box>
                <Box sx={{ width: 20, height: 20, flex: 1 }} />
                <Box sx={{ flex: 2 }}>
                  <Typography
                    sx={{
                      ...typoStyle,
                      color: theme.palette.primary.main,
                      mb: theme.spacing(0.5),
                    }}
                    variant="h6"
                    component="div"
                  >
                    {t("appTitle").toLocaleUpperCase()}
                  </Typography>
                  <Typography
                    sx={{ ...typoStyle }}
                    variant="overline"
                    component="div"
                    noWrap
                  >
                    {pageTitle.toLocaleUpperCase()}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    flex: 1,
                    justifyContent: "flex-end",
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <LanguageSelector />
                  {user && user.eMail && (
                    <Box component="div">
                      <Grow in={Boolean(user && user.eMail)}>
                        <div>
                          <AvatarMenu user={user} />
                        </div>
                      </Grow>
                    </Box>
                  )}
                </Box>
              </Box>
            </Toolbar>
          </AppBar>
        </Box>
      </Slide>
    );
  }
);

export default AppHeader;
