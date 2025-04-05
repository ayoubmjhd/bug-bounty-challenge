import { Box, Container, Typography } from "@mui/material";
import { observer } from "mobx-react";
import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation("app");
  const issues = [
    {
      icon: "🐞",
      title:
        'Console error: Warning: Each child in a list should have a unique "key" prop.',
      description:
        "Hope you are able to find what is causing this error, as it is annoying.",
    },
    {
      icon: "🐞",
      title:
        'The word "known" should be displayed bold in the introduction text.',
      description:
        "When implementing a solution, please ensure to not change the i18n text.",
    },
    {
      icon: "🐞",
      title:
        "User avatar in app bar is missing, although user should be fetched on app start correctly.",
      description:
        "On app start we load the current user object via a MobX store, but for any reason the user avatar is not displayed in the top right of the app bar. Attention: When solving this issue, you might will be confronted with a second bug.",
    },
    {
      icon: "🐞",
      title: "Optional: Countdown is broken sometimes (hard to reproduce).",
      description:
        "Some developers mentioned that the countdown in the app header behaves strange sometimes, but unfortunately they were not able to reproduce this glitch reliably, maybe you find the root cause.",
    },
    {
      icon: "⭐️",
      title: "Optional: It would be great to be able to switch the language.",
      description:
        "Please add a language select control in the app bar to swicth the UI language between english and german.",
    },
  ];

  return (
    <Box p={2} maxHeight="calc(100vh - 64px)" overflow={["auto", "auto"]}>
      <Container>
        <Typography variant="h1" textAlign="center">
          {t("home.welcome")}
        </Typography>

        {/* 
        Bold bug
        Issue: HTML tags were rendered as plain text --> <b>known</b> wasn't showing as bold
        Solution: render HTML content with dangerouslySetInnerHTML 
        Reason: React's default behavior is to escape HTML for security, but in this case, we needed to render the HTML tags
        */}
        <Typography
          variant="subtitle1"
          textAlign="center"
          dangerouslySetInnerHTML={{ __html: t("home.intro") }}
        />
        <Typography variant="body2" textAlign="center" color="textSecondary">
          {t("home.sidenote")}
        </Typography>
        {/*
         List Items Missing Key Props bug
        Problem: Console error warning about missing unique "key" props in list items
        Solution: Added unique key prop to ListItem components
        Reason: React requires unique keys for list items to better track and update components
        */}
        <List>
          {issues.map((issue) => (
            <ListItem key={issue.title}>
              <Typography variant="h5" sx={{ p: 2 }}>
                {issue.icon}
              </Typography>
              <ListItemText
                primary={issue.title}
                secondary={issue.description}
              />
            </ListItem>
          ))}
        </List>
      </Container>
    </Box>
  );
};

export default observer(Home);
