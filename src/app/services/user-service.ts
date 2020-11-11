import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { ContestComponent } from '../layout/modules/public/contest/contest.component';

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

    addTopic(data) {
        return {
            "table_name": "topic",
            "data": [{
                "name": data.name,
                "user_id": data.user_id,
                "description": data.description
            }]
        }
    }

    getCurrentPublicContest() {
        return {
            select: "contest.topic_id, contest.id, contest.name, contest.description, contest.type, contest.start_date_time, contest.end_date_time, contest.total_up_vote, contest.total_down_vote",
            where: "DATE('" + moment().format('YYYY-MM-DD') + "') BETWEEN contest.start_date_time AND contest.end_date_time AND type='public_side_contest'",
            sort_by: 'DATE(contest.start_date_time)',
            sort_order: 'DESC'
        }
    }

    getCurrentPrivateContest(params) {
        return {
            select: "contest.id, contest.name, contest.description, contest.type, contest.start_date_time, contest.end_date_time, contest.total_up_vote, contest.total_down_vote",
            join: [{
              "type": "INNER",
              "join_table": "private_contest_user",
              "on_join_table": "private_contest_user.contest_id",
              "on_from": "contest.id"
            }],
            where: "DATE('" + moment().format('YYYY-MM-DD') + "') BETWEEN contest.start_date_time AND contest.end_date_time AND type='private_side_contest' AND private_contest_user.user_id = " + params.user_id,
            limit: params.limit != '' ? params.limit : 1000,
        }
    }

    getCurrentMyPublicContest(uid) {
        return {
            select: "contest.topic_id, contest.id, contest.name, contest.description, contest.type, contest.start_date_time, contest.end_date_time, contest.total_up_vote, contest.total_down_vote",
            where: "DATE('" + moment().format('YYYY-MM-DD') + "') BETWEEN contest.start_date_time AND contest.end_date_time AND type='public_side_contest' AND contest.user_id = " + uid,
            sort_by: 'DATE(contest.start_date_time)',
            sort_order: 'DESC',
        }
    }

    getCurrentMyPrivateContest(params) {
        return {
            select: "contest.topic_id, contest.id, contest.name, contest.description, contest.type, contest.start_date_time, contest.end_date_time, contest.total_up_vote, contest.total_down_vote",
            where: "DATE('" + moment().format('YYYY-MM-DD') + "') BETWEEN contest.start_date_time AND contest.end_date_time AND type='private_side_contest' AND contest.user_id = " + params.user_id,
            sort_by: 'DATE(contest.start_date_time)',
            sort_order: 'DESC',
            limit: params.limit != '' ? params.limit : 1000,
        }
    }

    getPublicContests(params) {
        return {
            select: "contest.topic_id, contest.id, contest.name, contest.description, contest.type, contest.start_date_time, contest.end_date_time, contest.total_up_vote, contest.total_down_vote",
            where: "type='public_side_contest'" + (params.searchText == '' ? '' : " AND contest.name LIKE '%"+params.searchText+"%'"),
            limit: params.limit != '' ? params.limit : 1000,
            sort_by: 'DATE(contest.start_date_time)',
            sort_order: 'DESC'
        }
    }

    getPrivateContests(params) {
        return {
            select: "contest.id, contest.name, contest.description, contest.type, contest.start_date_time, contest.end_date_time, contest.total_up_vote, contest.total_down_vote",
            join: [{
              "type": "INNER",
              "join_table": "private_contest_user",
              "on_join_table": "private_contest_user.contest_id",
              "on_from": "contest.id"
            }],
            where: "type='private_side_contest' AND private_contest_user.user_id = " + params.user_id + (params.searchText == '' ? '' : " AND contest.name LIKE '%"+params.searchText+"%'"),
            limit: params.limit != '' ? params.limit : 1000,
            sort_by: 'DATE(contest.start_date_time)',
            sort_order: 'DESC'
        }
    }

    getMyPublicContests(params) {
        return {
            select: "contest.topic_id, contest.id, contest.name, contest.description, contest.type, contest.start_date_time, contest.end_date_time, contest.total_up_vote, contest.total_down_vote",
            where: "type='public_side_contest' AND contest.user_id = " + params.user_id + (params.searchText == '' ? '' : " AND contest.name LIKE '%"+params.searchText+"%'"),
            sort_by: 'DATE(contest.start_date_time)',
            sort_order: 'DESC',
            limit: params.limit != '' ? params.limit : 1000
        }
    }

    getMyPrivateContests(params) {
        return {
            select: "contest.topic_id, contest.id, contest.name, contest.description, contest.type, contest.start_date_time, contest.end_date_time, contest.total_up_vote, contest.total_down_vote",
            where: "type='private_side_contest' AND contest.user_id = " + params.user_id + (params.searchText == '' ? '' : " AND contest.name LIKE '%"+params.searchText+"%'"),
            sort_by: 'DATE(contest.start_date_time)',
            sort_order: 'DESC',
            limit: params.limit != '' ? params.limit : 1000
        }
    }

    getVotedVideoList(data) {
        return {
          select: "DISTINCT video.id,  video.contest_id, video.youtube_url, video.title, video.type, video.created_at, (SELECT count(id) FROM vote_for_video WHERE vote_for_video.video_id = video.id AND type = 'up_vote') AS up_vote, (SELECT count(id) FROM vote_for_video WHERE vote_for_video.video_id = video.id AND type = 'down_vote') AS down_vote",
          where: "vote_for_video.user_id = "+data.id+" AND video.is_deleted = 0",
          join: [
              {
                  "type": "INNER",
                  "join_table": "vote_for_video",
                  "on_join_table": "vote_for_video.video_id",
                  "on_from": "video.id"
              }
          ],
          sort_by: "video.created_at",
          sort_order: "DESC",
          limit: data.limit
        }
    }

    getContestEntered(data) {
        let where = '';
        if(data.contestType != '') {
            where = " AND contest.type = '" + data.contestType+"'";
        }
        if(data.search != undefined && data.search != '') {
            where += " AND contest.name LIKE '%"+data.search+"%'";
        }

        return {
            select: "DISTINCT contest.id,  contest.name, contest.description, contest.start_date_time, contest.end_date_time",
            where: "vote_for_video.user_id = "+data.id+" AND contest.is_deleted = 0" + where,
            join: [
                {
                    "type": "INNER",
                    "join_table": "vote_for_video",
                    "on_join_table": "vote_for_video.contest_id",
                    "on_from": "contest.id"
                }
            ],
            sort_by: "contest.start_date_time",
            sort_order: "DESC",
            limit: data.limit
        }
    }
}
