# Bug Bounty Challenge - Bug Fixes and Issues

This document outlines the bugs that were identified and fixed in the application, as well as some optional enhancements.

## Resolved Issues

### 1. List Items Missing Key Props
**Issue:** Console error warning about missing unique "key" props in list items.  
**Solution:** Added unique key props to ListItem components using the issue title as the key.  
**Reason:** React requires unique keys for list items to better track and update components efficiently.

### 2. Bold Text Rendering
**Issue:** HTML tags were rendered as plain text (e.g., `<b>known</b>` wasn't showing as bold).  
**Solution:** Implemented HTML content rendering using `dangerouslySetInnerHTML`.  
**Reason:** React's default behavior is to escape HTML for security. In this case, we needed to explicitly render the HTML tags.

### 3. User Avatar Display
**Issue:** User avatar in the app bar was missing although user data being fetched on app start.  
**Root Cause:** Typo in property name (`urser` instead of `user`) preventing user data from being stored correctly.  
**Solution:** Fixed the property name typo to correctly store and display user data.

## Optional Enhancements

### 1. Countdown Timer Issue
**Issue:** The countdown in the app header occasionally behaves unexpectedly (intermittent).  
**Status:** Under investigation - requires reliable reproduction steps.  
**Note:** This is a hard-to-reproduce issue that needs further investigation.

### 2. Language Switching Feature
**Enhancement Request:** Add language switching capability between English and German.  
**Proposed Solution:** Implement a language select control in the app bar.  
**Status:** Pending implementation.

## Additional Notes

- The application uses React with MobX for state management
- Internationalization (i18n) is implemented for multi-language support
- Material-UI (MUI) is used for the component library

## Development Setup

To run the application locally:

1. Install dependencies:
```bash
pnpm install
```

2. Start the development server:
```bash
pnpm dev
```

