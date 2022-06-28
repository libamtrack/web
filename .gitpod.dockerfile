FROM gitpod/workspace-full

RUN git clone https://github.com/emscripten-core/emsdk.git $HOME/emsdk
RUN cd $HOME/emsdk && ./emsdk install latest && ./emsdk activate latest
RUN wget -q "http://ftpmirror.gnu.org/gnu/gsl/gsl-latest.tar.gz"
RUN mkdir $HOME/gsl-latest
RUN tar -xzf gsl-latest.tar.gz -C $HOME/gsl-latest
RUN mv $HOME/gsl-latest/** $HOME/gsl-latest/gsl
RUN mkdir $HOME/usr
RUN cd $HOME/emsdk && . ./emsdk_env.sh && cd $HOME/gsl-latest/gsl/ && emconfigure ./configure --prefix=$HOME/usr --disable-shared && emmake make -j2 && emmake make install
RUN cd library/distributions/JavaScript && GSL_INCLUDE_DIRS=$HOME/usr/include GSL_LIBRARY=$HOME/usr/lib/libgsl.a GSL_CBLAS_LIBRARY=$HOME/usr/lib/libgslcblas.a  ./compile_to_js.sh