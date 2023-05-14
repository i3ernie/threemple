import gulp from 'gulp';
//const concat = require('gulp-concat');
import * as rollup from 'rollup';
import { nodeResolve } from '@rollup/plugin-node-resolve';

const rollupBuild = function ( inputOptions, outputOptions, done ) {
    
    // create a bundle
    rollup.rollup( inputOptions ).then( function( bundle ) {

        console.log( bundle.watchFiles ); // an array of file names this bundle depends on

        // generate code
        bundle.generate( outputOptions ).then( function( output ){

            // or write the bundle to disk
            bundle.write(outputOptions).then(function(){
                done();
            });
        });

    });

};

gulp.task('packTreempleModule', function( done ){
 
    rollupBuild( {
        input: 'src/threemple.m.js',
        plugins: [ ],
    }, {
        file: 'dist/threemple.module.js',
        exports : 'named',
        format: 'es'
    }, done );
});

gulp.task('packTreempleFullModule', function( done ){
 
    rollupBuild( {
        input: 'src/threemple.full.js',
        plugins: [
            nodeResolve()
        ],
    }, {
        file: 'dist/threemple.full.m.js',
        exports : 'named',
        format: 'es'
    }, done );
});