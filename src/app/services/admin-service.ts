import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

    constructor() { }

    getCurrentContest(data) {
        return {
            select: "contest.id, contest.type, contest.start_date_time, contest.end_date_time, contest.total_up_vote, contest.total_down_vote, topic.name, topic.id AS topicId",
            where: "DATE('"+moment().format('YYYY-MM-DD')+"') BETWEEN contest.start_date_time AND contest.end_date_time",
            join: [{
                "type": "INNER",
                "join_table": "topic",
                "on_join_table": "id",
                "on_from": "topic_id"
            }]
        }
    }

    getHomePageVideos(data) {
        if(data.sortType == 'vote') {
            return {
                select: "video.id, video.title, video.youtube_url, video.user_id, video.created_at, (SELECT count(id) FROM vote_for_video WHERE vote_for_video.video_id = video.id AND type = 'up_vote') AS up_vote, (SELECT count(id) FROM vote_for_video WHERE vote_for_video.video_id = video.id AND type = 'down_vote') AS down_vote",
                where: "video.type = '"+data.type+"' AND contest_id = " + data.id,
                sort_by: "up_vote - down_vote",
                sort_order: "DESC"
            }
        }
        else {
            return {
                select: "video.id, video.title, video.youtube_url, video.user_id, video.created_at, (SELECT count(id) FROM vote_for_video WHERE vote_for_video.video_id = video.id AND type = 'up_vote') AS up_vote, (SELECT count(id) FROM vote_for_video WHERE vote_for_video.video_id = video.id AND type = 'down_vote') AS down_vote",
                where: "video.type = '"+data.type+"' AND contest_id = " + data.id,
                sort_by: "DATE(video.created_at)",
                sort_order: "DESC"
            }
        }
    }

    getUpComingContest() {
        return {
            select: "contest.id, contest.type, contest.start_date_time, contest.end_date_time, contest.total_up_vote, contest.total_down_vote, topic.name, topic.id AS topicId",
            where: "DATE(contest.end_date_time) > DATE('"+moment().format('YYYY-MM-DD')+"') AND DATE('"+moment().format('YYYY-MM-DD')+"') NOT BETWEEN contest.start_date_time AND contest.end_date_time ",
            join: [{
              "type": "INNER",
              "join_table": "topic",
              "on_join_table": "id",
              "on_from": "topic_id"
            }],
            limit: "0,4"
        }
    }

    getTopicPools(data) {
        if(data.sortType == 'vote') {
            return {
                select: "topic.id, topic.name, topic.user_id, topic.description, topic.created_at, (SELECT count(id) FROM vote_for_topic WHERE vote_for_topic.topic_id = topic.id AND type = 'up_vote') AS up_vote, (SELECT count(id) FROM vote_for_topic WHERE vote_for_topic.topic_id = topic.id AND type = 'down_vote') AS down_vote",
                sort_by: "up_vote - down_vote",
                sort_order: "DESC"
            }
        }
        else {
            return {
                select: "topic.id, topic.name, topic.user_id, topic.description, topic.created_at, (SELECT count(id) FROM vote_for_topic WHERE vote_for_topic.topic_id = topic.id AND type = 'up_vote') AS up_vote, (SELECT count(id) FROM vote_for_topic WHERE vote_for_topic.topic_id = topic.id AND type = 'down_vote') AS down_vote",
                sort_by: "DATE(topic.created_at)",
                sort_order: "DESC"
            }
        }
    }
}
