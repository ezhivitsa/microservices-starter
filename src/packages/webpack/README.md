# Webpack package

This package provides basic webpack configuration for client services including webpack rules for `.ts` and `.pcss` files.

Configuration can be made for development or production environment. The main differences between development and production versions are:

1. in development version we set up development server and pass `port` on which we will start this server
2. in production version we use all possible optimizations
3. in production version we use `MiniCssExtractPlugin` to extract all styles to separate files
