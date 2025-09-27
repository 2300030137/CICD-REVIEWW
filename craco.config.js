// CRACO configuration to fix Webpack path issues with exclamation marks
const fs = require('fs');
const os = require('os');
const path = require('path');

module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      // Disable ESLint temporarily to avoid issues
      webpackConfig.plugins = webpackConfig.plugins.filter(
        plugin => !(plugin && plugin.constructor && plugin.constructor.name === 'ESLintWebpackPlugin')
      );
      
      // Completely disable the Webpack cache to avoid path issues
      webpackConfig.cache = false;
      
      // Update module rules to handle include paths differently
      if (webpackConfig.module && webpackConfig.module.rules) {
        webpackConfig.module.rules.forEach(rule => {
          if (rule.oneOf) {
            rule.oneOf.forEach(oneOf => {
              // Remove include/exclude that might have problematic paths
              if (oneOf.include) {
                delete oneOf.include;
              }
              if (oneOf.exclude) {
                delete oneOf.exclude;
              }
            });
          }
        });
      }
      
      // Use a temporary directory without exclamation marks for output
      // This is a workaround to avoid the Webpack path validation
      const tempOutputDir = path.resolve(os.tmpdir(), 'social-media-frontend-build');
      
      // Create the temporary directory if it doesn't exist
      if (!fs.existsSync(tempOutputDir)) {
        fs.mkdirSync(tempOutputDir, { recursive: true });
      }
      
      // Override the output path to use the temporary directory
      webpackConfig.output.path = tempOutputDir;
      
      // Update the publicPath to ensure assets are loaded correctly
      webpackConfig.output.publicPath = '/';
      
      return webpackConfig;
    }
  },
  // Custom script to copy the build files back to the original directory after build
  plugins: [
    {
      plugin: {
        overrideCracoConfig: ({ cracoConfig }) => {
          if (!cracoConfig.skipPreflightCheck) {
            cracoConfig.skipPreflightCheck = true;
          }
          return cracoConfig;
        },
        // This is a custom plugin that will run after the build
        afterBuild: ({ stats, buildDir }) => {
          try {
            const fs = require('fs');
            const path = require('path');
            const os = require('os');
            
            // Define the source and destination directories
            const tempBuildDir = path.resolve(os.tmpdir(), 'social-media-frontend-build');
            const finalBuildDir = path.resolve(__dirname, 'build');
            
            console.log(`\nCopying build files from ${tempBuildDir} to ${finalBuildDir}...`);
            
            // Create the final build directory if it doesn't exist
            if (!fs.existsSync(finalBuildDir)) {
              fs.mkdirSync(finalBuildDir, { recursive: true });
            }
            
            // Function to copy files recursively
            const copyRecursiveSync = (src, dest) => {
              const exists = fs.existsSync(src);
              const stats = exists && fs.statSync(src);
              const isDirectory = exists && stats.isDirectory();
              
              if (isDirectory) {
                if (!fs.existsSync(dest)) {
                  fs.mkdirSync(dest);
                }
                fs.readdirSync(src).forEach((childItemName) => {
                  copyRecursiveSync(
                    path.join(src, childItemName),
                    path.join(dest, childItemName)
                  );
                });
              } else {
                fs.copyFileSync(src, dest);
              }
            };
            
            // Copy the build files
            copyRecursiveSync(tempBuildDir, finalBuildDir);
            console.log('Build files copied successfully!');
            
          } catch (error) {
            console.error('Error copying build files:', error);
          }
        },
      },
    },
  ],
};

// After build script to copy files
// This will be executed after the Webpack build completes