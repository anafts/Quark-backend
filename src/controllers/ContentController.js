const knex = require('../database');
const firebase = require('firebase/app')
const firebaseStorage = require('firebase/storage')
const app = firebase.initializeApp({ storageBucket: 'gs://quark-25fa0.appspot.com' })
const storage = firebaseStorage.getStorage(app)

module.exports = {

    async listContent(req, res, next){
        try {

            const listContent = await knex('content')
            .select('id', 'text', 'videoURL', 'audioURL','created_at', 'updated_at', 'methods_id');


            return res.status(200).send(listContent);
            
        } catch (error) {

          next (error); 
        }

    },

    async createContent(req, res, next) {
        const video = req.files.video
        const audio = req.files.audio
        let videoUrl, audioUrl

        if (video?.length) {
            const ref = firebaseStorage.ref(storage, video[0].originalname)
            
            await firebaseStorage.uploadBytes(ref, video[0].buffer, {
                contentType: video[0].mimetype
            })

            videoUrl = await firebaseStorage.getDownloadURL(ref)
        }

        if (audio?.length) {
            const ref = firebaseStorage.ref(storage, audio[0].originalname)

            await firebaseStorage.uploadBytes(ref, audio[0].buffer, {
                contentType: audio[0].mimetype
            })

            audioUrl = await firebaseStorage.getDownloadURL(ref)
        }
        
        try {
            await knex('content')
                .insert({ text: req.body?.text, videoURL: videoUrl, audioURL: audioUrl, methods_id: req.params.methodsId })

            return res.status(200).send("Content updated");

        } catch (error) {

            next(error);
        }
    },

    async updateContent(req, res, next) {

        const video = req.files.video
        const audio = req.files.audio
        let videoUrl, audioUrl

        if (video?.length) {
            const ref = firebaseStorage.ref(storage, video[0].originalname)
            
            await firebaseStorage.uploadBytes(ref, video[0].buffer, {
                contentType: video[0].mimetype
            })

            videoUrl = await firebaseStorage.getDownloadURL(ref)
        }

        if (audio?.length) {
            const ref = firebaseStorage.ref(storage, audio[0].originalname)

            await firebaseStorage.uploadBytes(ref, audio[0].buffer, {
                contentType: audio[0].mimetype
            })

            audioUrl = await firebaseStorage.getDownloadURL(ref)
        }

        try {

        const { id } = req.params;

         await knex('content')
         .update({ text: req.body?.text, videoURL: videoUrl, audioURL: audioUrl })
         .where({ 'id': id });
        
         return res.send("OK")
        } catch (error) {
            next(error)
        }
    }


}