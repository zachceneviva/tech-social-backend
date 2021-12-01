const db = require('./models')

// db.Post.deleteMany({}, (err, result) => {
//     if (err) {
//       console.log(err);
//       process.exit();
//     }
    
//     console.log(result.deletedCount,'posts deleted')})

//     db.Comment.deleteMany({}, (err, result) => {
//         if (err) {
//           console.log(err);
//           process.exit();
//         }
        
//         console.log(result.deletedCount,'comments deleted')})

//         db.User.deleteMany({}, (err, result) => {
//             if (err) {
//               console.log(err);
//               process.exit();
//             }
            
//             console.log(result.deletedCount,'users deleted')})

            db.Message.deleteMany({}, (err, result) => {
              if (err) {
                console.log(err);
                process.exit();
              }
              
              console.log(result.deletedCount,'users deleted')})