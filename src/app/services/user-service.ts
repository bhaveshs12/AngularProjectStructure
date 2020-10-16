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
            sort_order: 'ASC'
        }
    }

    getCurrentMyPublicContest(uid) {
        return {
            select: "contest.topic_id, contest.id, contest.name, contest.description, contest.type, contest.start_date_time, contest.end_date_time, contest.total_up_vote, contest.total_down_vote",
            where: "DATE('" + moment().format('YYYY-MM-DD') + "') BETWEEN contest.start_date_time AND contest.end_date_time AND type='public_side_contest' AND contest.user_id = " + uid,
            sort_by: 'DATE(contest.start_date_time)',
            sort_order: 'ASC'
        }
    }

    getCurrentMyPrivateContest(uid) {
        return {
            select: "contest.topic_id, contest.id, contest.name, contest.description, contest.type, contest.start_date_time, contest.end_date_time, contest.total_up_vote, contest.total_down_vote",
            where: "DATE('" + moment().format('YYYY-MM-DD') + "') BETWEEN contest.start_date_time AND contest.end_date_time AND type='private_side_contest' AND contest.user_id = " + uid,
            sort_by: 'DATE(contest.start_date_time)',
            sort_order: 'ASC'
        }
    }

    getPublicContests(params) {
        return {
            select: "contest.topic_id, contest.id, contest.name, contest.description, contest.type, contest.start_date_time, contest.end_date_time, contest.total_up_vote, contest.total_down_vote",
            where: "type='public_side_contest'" + (params.searchText == '' ? '' : " AND contest.name LIKE '%"+params.searchText+"%'"),
            limit: params.limit != '' ? params.limit : 1000,
            sort_by: 'DATE(contest.start_date_time)',
            sort_order: 'ASC'
        }
    }

    getMyPublicContests(params) {
        return {
            select: "contest.topic_id, contest.id, contest.name, contest.description, contest.type, contest.start_date_time, contest.end_date_time, contest.total_up_vote, contest.total_down_vote",
            where: "type='public_side_contest' AND contest.user_id = " + params.user_id + (params.searchText == '' ? '' : " AND contest.name LIKE '%"+params.searchText+"%'"),
            sort_by: 'DATE(contest.start_date_time)',
            sort_order: 'ASC',
            limit: params.limit != '' ? params.limit : 1000
        }
    }

    getMyPrivateContests(params) {
        return {
            select: "contest.topic_id, contest.id, contest.name, contest.description, contest.type, contest.start_date_time, contest.end_date_time, contest.total_up_vote, contest.total_down_vote",
            where: "type='private_side_contest' AND contest.user_id = " + params.user_id + (params.searchText == '' ? '' : " AND contest.name LIKE '%"+params.searchText+"%'"),
            sort_by: 'DATE(contest.start_date_time)',
            sort_order: 'ASC',
            limit: params.limit != '' ? params.limit : 1000
        }
    }
}
