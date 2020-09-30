import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor() { }
    
    getVideoDetails(id) {
        return {
            select: "video.id, video.title, video.youtube_url, video.contest_id, video.user_id, video.type, video.created_at",
            where: "video.id = " + id
        }
    }

    voteVideo(data) {
        return {
            table_name: "vote_for_video",
            data: [{
                "video_id": data.video_id,
                "contest_id": data.contest_id,
                "type": data.type,
                "user_id": data.user_id
            }]
        }
    }
}
