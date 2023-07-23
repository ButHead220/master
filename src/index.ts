import express, {Express, Request, Response} from "express"

const app : Express = express()
const port : 3000 = 3000

app.use(express.json())

type RequestWithParams<P> = Request<P, {}, {}, {}>
type RequestWithBody<B> = Request<{}, {}, B, {}>

type ErrorMessageType = {
    message: string,
    field: string,
}

type ErrorType = {
    errorsMessages: ErrorMessageType[]
}
enum AvailableResolutions {
    P144 = "P144",
    P240 = "P240",
    P360 = "P360",
    P480 = "P480",
    P720 = "P720",
    P1080 = "P1080",
    P1440 = "P1440",
    P2160 = "P2160",
}

type VideoType = {
    id: number,
    title: string,
    author: string,
    canBeDownloaded: boolean,
    minAgeRestriction: number | null,
    createdAt: string,
    publicationDate: string,
    availableResolutions: AvailableResolutions[]
}

const videos : VideoType[] = [
    {
        id: 0,
        title: "string",
        author: "string",
        canBeDownloaded: true,
        minAgeRestriction: null,
        createdAt: "2023-07-23T05:46:05.802Z",
        publicationDate: "2023-07-23T05:46:05.802Z",
        availableResolutions: [
            AvailableResolutions.P1440
        ]
    }
]

app.get('/videos', (req: Request, res: Response) => {
    res.send(videos)
})

app.get('/videos/:id', (req: RequestWithParams<{id: number}>, res: Response) => {
    const id  = +req.params.id

    const video = videos.find((video) => video.id === id)

    if(!video) {
        res.sendStatus(404)
        return
    }
    res.send(video)
})

app.post('/videos', (req: RequestWithBody<{
    title: string,
    author: string,
    availableResolutions: AvailableResolutions[]
}>, res: Response) => {
    let errors: ErrorType = {
        errorsMessages: []
    }

    let {title, author, availableResolutions} = req.body

    if (!title || !title.length || title.trim().length > 40){
        errors.errorsMessages.push({message: 'Invalid title', field: 'title'})
    }

    if (!author || !author.length || author.trim().length > 20){
        errors.errorsMessages.push({message: 'Invalid author', field: 'author'})
    }

    if (Array.isArray(availableResolutions)) {
        availableResolutions.map((r) => {
            !AvailableResolutions[r] && errors.errorsMessages.push({
                message: 'Invalid availableResolutions',
                field: 'availableResolutions'
            })
        })
    } else {
        availableResolutions = []
    }

    if (errors.errorsMessages.length){
        res.status(400).send(errors)
        return
    }

})

app.listen(port, () : void => {
    console.log(`Example app listening on port ${port}`)
})