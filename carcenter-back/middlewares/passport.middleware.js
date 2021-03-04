const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const Usuarios = require('../models/usuarios.model');

passport.serializeUser((usuario, done) => {
  done(null, usuario.correo);
});

passport.deserializeUser((correo, done) => {
  Usuarios.findOne({ correo }).then((usuario) => {
    usuario.password = undefined;
    done(null, usuario);
  });
});

const googleCofig = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_LOGIN,
};

passport.use(
  new GoogleStrategy(googleCofig, async (token, tokenSecret, profile, done) => {
    try {
      const correo = profile.emails[0].value;
      const usuario = await Usuarios.findOne({ correo });
      if (usuario) {
        return done(null, usuario);
      } else {
        const nuevoUsuario = new Usuarios({
          nombre: profile.displayName,
          correo: correo,
          password: generarPassword(),
          img: profile.photos[0].value,
          google: true,
        });

        const usuarioCreado = await nuevoUsuario.save();
        return done(null, usuarioCreado);
      }
    } catch (error) {
      console.log(error);
      done('Error al iniciar sesión');
    }
  })
);

const generarPassword = (longitud = 8) => {
  let password = '';
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const caracteresLength = caracteres.length;

  for (let i = 0; i < longitud; i++) {
    password += caracteres.charAt(Math.floor(Math.random() * caracteresLength));
  }

  return password;
};
