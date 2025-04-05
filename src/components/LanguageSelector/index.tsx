import { Box, Button, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FALLBACK_LANGUAGE, Language } from "../../i18n/i18n";

const languages: Language[] = [
  { locale: "en", name: "English", icon: "EN" },
  { locale: "de", name: "Deutsch", icon: "DE" },
];

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (locale: string) => {
    i18n.changeLanguage(locale);
    handleClose();
  };

  return (
    <Box>
      <Button
        onClick={handleClick}
        color="inherit"
        sx={{ minWidth: "auto", padding: "8px" }}
      >
        {languages.find((lang) => lang.locale === i18n.language)?.icon ||
          languages.find((lang) => lang.locale === FALLBACK_LANGUAGE)?.icon}
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {languages.map((language) => (
          <MenuItem
            key={language.locale}
            onClick={() => handleLanguageChange(language.locale)}
            selected={i18n.language === language.locale}
          >
            <Box display="flex" alignItems="center" gap={1}>
              <span>{language.icon}</span>
              <span>{language.name}</span>
            </Box>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default LanguageSelector;
