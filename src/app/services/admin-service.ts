import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
    providedIn: 'root'
})
export class AdminService {

    constructor() { }
    
    getCurrentContest(data) {
        return {
            select: "contest.topic_id, contest.id, contest.name, contest.description, contest.type, contest.start_date_time, contest.end_date_time, contest.total_up_vote, contest.total_down_vote",
            where: "DATE('" + moment().format('YYYY-MM-DD') + "') BETWEEN contest.start_date_time AND contest.end_date_time AND type='main_contest'",
            limit: "1"
        }
    }

    getContest(id) {
        return {
            select: "contest.topic_id, contest.id, contest.name, contest.description, contest.type, contest.start_date_time, DATEDIFF(DATE(NOW()), DATE(contest.end_date_time)) as diff, contest.end_date_time, contest.total_up_vote, contest.total_down_vote",
            where: "contest.id = "+id,
            sort_by: "topic_id",
            sort_order: "ASC",
            limit: "0,2"
        }
    }

    getHomePageVideos(data) {
        if(data.type == 'SNAFU') {
            if(data.sortType == 'vote') {
                return {
                    "select": "DISTINCT video.id, video.title, video.youtube_url, video.user_id, video.created_at, (SELECT count(id) FROM vote_for_video WHERE vote_for_video.video_id = video.id AND vote_type = 'Snafu') AS up_vote, (SELECT count(id) FROM vote_for_video WHERE vote_for_video.video_id = video.id AND vote_type = 'Snafu') AS down_vote",
                    "join": [
                        {
                            "type": "INNER",
                            "join_table": "vote_for_video",
                            "on_join_table": "vote_for_video.video_id",
                            "on_from": "video.id"
                        }
                    ],
                    "where": "vote_for_video.vote_type = 'Snafu' AND video.contest_id = " + data.id,
                    "sort_by": "up_vote - down_vote",
                    "sort_order": "DESC"
                }
            }
            else {
                return {
                    "select": "DISTINCT video.id, video.title, video.youtube_url, video.user_id, video.created_at, (SELECT count(id) FROM vote_for_video WHERE vote_for_video.video_id = video.id AND type = 'up_vote') AS up_vote, (SELECT count(id) FROM vote_for_video WHERE vote_for_video.video_id = video.id AND type = 'down_vote') AS down_vote",
                    "join": [
                        {
                            "type": "INNER",
                            "join_table": "vote_for_video",
                            "on_join_table": "vote_for_video.video_id",
                            "on_from": "video.id"
                        }
                    ],
                    "where": "vote_for_video.vote_type = 'Snafu' AND video.contest_id = " + data.id,
                    "sort_by": "DATE(video.created_at)",
                    "sort_order": "DESC"
                }
            }
        }
        else {
            if (data.sortType == 'vote') {
                return {
                    select: "video.id, video.title, video.youtube_url, video.user_id, video.created_at, (SELECT count(id) FROM vote_for_video WHERE vote_for_video.video_id = video.id AND type = 'up_vote') AS up_vote, (SELECT count(id) FROM vote_for_video WHERE vote_for_video.video_id = video.id AND type = 'down_vote') AS down_vote",
                    where: "video.type = '" + data.type + "' AND contest_id = " + data.id,
                    sort_by: "up_vote - down_vote",
                    sort_order: "DESC"
                }
            }
            else if(data.sortType == 'hot') {
                let pastDate = moment().subtract(1, 'days').format('YYYY-MM-DD h:mm:ss');
                let pastOfPastDate = moment().subtract(2, 'days').format('YYYY-MM-DD h:mm:ss');
                let currentDate = moment().format('YYYY-MM-DD h:mm:ss');
    
                return {
                    select: "video.id, video.title, video.youtube_url, video.user_id, video.created_at, (SELECT count(id) FROM vote_for_video WHERE vote_for_video.video_id = video.id AND type = 'up_vote') AS up_vote, (SELECT count(id) FROM vote_for_video WHERE vote_for_video.video_id = video.id AND type = 'down_vote') AS down_vote, ((SELECT count(id) FROM vote_for_video  WHERE vote_for_video.video_id = video.id AND vote_for_video.type = 'up_vote' AND vote_for_video.created_at > '"+pastDate+"' AND vote_for_video.created_at < '"+currentDate+"') - (SELECT count(id) FROM vote_for_video WHERE vote_for_video.video_id = video.id AND vote_for_video.type = 'down_vote' AND vote_for_video.created_at > '"+pastDate+"' AND vote_for_video.created_at < '"+currentDate+"')) AS currentCount, ((SELECT count(id) FROM vote_for_video WHERE vote_for_video.video_id = video.id AND vote_for_video.type = 'up_vote' AND vote_for_video.created_at > '"+pastOfPastDate+"' AND vote_for_video.created_at < '"+pastDate+"' ) - (SELECT count(id) FROM vote_for_video WHERE vote_for_video.video_id = video.id AND vote_for_video.type = 'down_vote' AND vote_for_video.created_at > '"+pastOfPastDate+"' AND vote_for_video.created_at < '"+currentDate+"')) AS prevCount",
                    where: "video.type = '" + data.type + "' AND contest_id = " + data.id,
                    sort_by: "currentCount - prevCount",
                    sort_order: "DESC"
                }
            }
            else {
                return {
                    select: "video.id, video.title, video.youtube_url, video.user_id, video.created_at, (SELECT count(id) FROM vote_for_video WHERE vote_for_video.video_id = video.id AND type = 'up_vote') AS up_vote, (SELECT count(id) FROM vote_for_video WHERE vote_for_video.video_id = video.id AND type = 'down_vote') AS down_vote",
                    where: "video.type = '" + data.type + "' AND contest_id = " + data.id,
                    sort_by: "DATE(video.created_at)",
                    sort_order: "DESC"
                }
            }
        }
    }

    getUpComingContest() {
        return {
            select: "contest.topic_id, contest.id, contest.name, contest.description, contest.type, contest.start_date_time, contest.end_date_time, contest.total_up_vote, contest.total_down_vote",
            where: "DATE(contest.end_date_time) > DATE('" + moment().format('YYYY-MM-DD') + "') AND DATE('" + moment().format('YYYY-MM-DD') + "') NOT BETWEEN contest.start_date_time AND contest.end_date_time AND type='main_contest'",
            limit: "0,4"
        }
    }

    getTopicPools(data) {
        let pastDate = moment().subtract(1, 'days').format('YYYY-MM-DD h:mm:ss');
        let pastOfPastDate = moment().subtract(2, 'days').format('YYYY-MM-DD h:mm:ss');
        let currentDate = moment().format('YYYY-MM-DD h:mm:ss');
        if (data.sortType == 'vote') {
            return {
                select: "topic.id, topic.name, topic.user_id, topic.description, topic.created_at, (SELECT count(id) FROM vote_for_topic WHERE vote_for_topic.topic_id = topic.id AND type = 'up_vote') AS up_vote, (SELECT count(id) FROM vote_for_topic WHERE vote_for_topic.topic_id = topic.id AND type = 'down_vote') AS down_vote, ((SELECT count(id) FROM vote_for_topic  WHERE vote_for_topic.topic_id = topic.id AND vote_for_topic.type = 'up_vote' AND vote_for_topic.created_at > '"+pastDate+"' AND vote_for_topic.created_at < '"+currentDate+"') - (SELECT count(id) FROM vote_for_topic WHERE vote_for_topic.topic_id = topic.id AND vote_for_topic.type = 'down_vote' AND vote_for_topic.created_at > '"+pastDate+"' AND vote_for_topic.created_at < '"+currentDate+"')) AS currentCount, ((SELECT count(id) FROM vote_for_topic WHERE vote_for_topic.topic_id = topic.id AND vote_for_topic.type = 'up_vote' AND vote_for_topic.created_at > '"+pastOfPastDate+"' AND vote_for_topic.created_at < '"+pastDate+"' ) - (SELECT count(id) FROM vote_for_topic WHERE vote_for_topic.topic_id = topic.id AND vote_for_topic.type = 'down_vote' AND vote_for_topic.created_at > '"+pastOfPastDate+"' AND vote_for_topic.created_at < '"+pastDate+"')) AS prevCount",
                sort_by: "up_vote - down_vote",
                sort_order: "DESC",
                limit: data.limit
            }
        }
        else if (data.sortType == 'hot'){
            return {
                select: "topic.id, topic.name, topic.user_id, topic.description, topic.created_at, (SELECT count(id) FROM vote_for_topic WHERE vote_for_topic.topic_id = topic.id AND type = 'up_vote') AS up_vote, (SELECT count(id) FROM vote_for_topic WHERE vote_for_topic.topic_id = topic.id AND type = 'down_vote') AS down_vote, ((SELECT count(id) FROM vote_for_topic  WHERE vote_for_topic.topic_id = topic.id AND vote_for_topic.type = 'up_vote' AND vote_for_topic.created_at > '"+pastDate+"' AND vote_for_topic.created_at < '"+currentDate+"') - (SELECT count(id) FROM vote_for_topic WHERE vote_for_topic.topic_id = topic.id AND vote_for_topic.type = 'down_vote' AND vote_for_topic.created_at > '"+pastDate+"' AND vote_for_topic.created_at < '"+currentDate+"')) AS currentCount, ((SELECT count(id) FROM vote_for_topic WHERE vote_for_topic.topic_id = topic.id AND vote_for_topic.type = 'up_vote' AND vote_for_topic.created_at > '"+pastOfPastDate+"' AND vote_for_topic.created_at < '"+pastDate+"' ) - (SELECT count(id) FROM vote_for_topic WHERE vote_for_topic.topic_id = topic.id AND vote_for_topic.type = 'down_vote' AND vote_for_topic.created_at > '"+pastOfPastDate+"' AND vote_for_topic.created_at < '"+pastDate+"')) AS prevCount",
                sort_by: "currentCount - prevCount",
                sort_order: "DESC",
                limit: data.limit
            }
        }
        else {
            return {
                select: "topic.id, topic.name, topic.user_id, topic.description, topic.created_at, (SELECT count(id) FROM vote_for_topic WHERE vote_for_topic.topic_id = topic.id AND type = 'up_vote') AS up_vote, (SELECT count(id) FROM vote_for_topic WHERE vote_for_topic.topic_id = topic.id AND type = 'down_vote') AS down_vote, ((SELECT count(id) FROM vote_for_topic  WHERE vote_for_topic.topic_id = topic.id AND vote_for_topic.type = 'up_vote' AND vote_for_topic.created_at > '"+pastDate+"' AND vote_for_topic.created_at < '"+currentDate+"') - (SELECT count(id) FROM vote_for_topic WHERE vote_for_topic.topic_id = topic.id AND vote_for_topic.type = 'down_vote' AND vote_for_topic.created_at > '"+pastDate+"' AND vote_for_topic.created_at < '"+currentDate+"')) AS currentCount, ((SELECT count(id) FROM vote_for_topic WHERE vote_for_topic.topic_id = topic.id AND vote_for_topic.type = 'up_vote' AND vote_for_topic.created_at > '"+pastOfPastDate+"' AND vote_for_topic.created_at < '"+pastDate+"' ) - (SELECT count(id) FROM vote_for_topic WHERE vote_for_topic.topic_id = topic.id AND vote_for_topic.type = 'down_vote' AND vote_for_topic.created_at > '"+pastOfPastDate+"' AND vote_for_topic.created_at < '"+pastDate+"')) AS prevCount",
                sort_by: "DATE(topic.created_at)",
                sort_order: "DESC",
                limit: data.limit
            }
        }
    }

    getContestHistory(data) {
        let type = "";
        if(data.type == 'public')
            type = "public_side_contest";
        else if(data.type == "main")
            type = "main_contest";
        else if(data.type == "private")
            type = "private_side_contest";

        let where = "DATE(contest.end_date_time) < DATE('"+moment().format('YYYY-MM-DD')+"') AND DATE('"+moment().format('YYYY-MM-DD')+"') NOT BETWEEN contest.start_date_time AND contest.end_date_time";
        if(data.search != '')
            where += " AND contest.name LIKE '%"+data.search+"%'";
        if(data.type != '')
            where += " AND contest.type = '" + type + "'";

        return {
            select: "contest.topic_id, contest.id, contest.name, contest.description, contest.type, contest.start_date_time, contest.end_date_time, contest.total_up_vote, contest.total_down_vote",
            where: where,
            sort_by: "contest.created_at",
            sort_order: "ASC",
            limit: data.limit
        }
    }

    getUserList(data) {
        return {
            select: "user_info.id, user_info.eth_address, user_info.display_name, user_info.created_at",
            where: "role_id = 2 AND (user_info.eth_address LIKE '%"+data.search+"%' OR user_info.display_name LIKE '%"+data.search+"%')",
            sort_by: data.type == 'name' ? "user_info.display_name" : "user_info.eth_address",
            sort_order: "ASC",
            limit: data.limit
        }
    }

    getWinners(data) {
        return {
            select: "winner.id, winner.contest_id, winner.video_id, winner.created_at, video.user_id, video.youtube_url, video.title, video.type",
            where: "winner.contest_id = " + data,
            join: [{
              "type": "INNER",
              "join_table": "video",
              "on_join_table": "video.id",
              "on_from": "winner.video_id"
            }]
        }
    }

    sendTokens() {
        return {

        }
    }

    getWinnerList(limit) {
        return {
            select: "winner.id, winner.contest_id, winner.video_id, winner.created_at, user_info.eth_address, user_info.display_name, contest.type, video.user_id, video.type as videoType, false as value, winner.token_Send, (CASE WHEN video.type = 'Beginner' THEN contest.beginner_prize WHEN video.type = 'Expert' THEN contest.expert_prize WHEN video.type = 'Intermediate' THEN contest.intermediate_prize ELSE contest.snafu_prize END) AS tokens",
            join: [
                {
                    "type": "INNER",
                    "join_table": "video",
                    "on_join_table": "video.id",
                    "on_from": "winner.video_id"
                },
                {
                    "type": "INNER",
                    "join_table": "contest",
                    "on_join_table": "contest.id",
                    "on_from": "winner.contest_id"
                },
                {
                    "type": "INNER",
                    "join_table": "user_info",
                    "on_join_table": "user_info.id",
                    "on_from": "video.user_id"
                }
            ],
            limit: limit
        }
    }

    getGoodVoterList(limit) {
        return {
            select: "vote_for_video.id, vote_for_video.token_send, user_info.id AS user_id, user_info.eth_address, user_info.display_name, false as value, contest.good_voter_prize AS tokens",
            where: "vote_for_video.type = 'up_vote'",
            join: [
                {
                    "type": "INNER",
                    "join_table": "vote_for_video",
                    "on_join_table": "vote_for_video.video_id",
                    "on_from": "winner.video_id"
                },
                {
                    "type": "INNER",
                    "join_table": "contest",
                    "on_join_table": "contest.id",
                    "on_from": "winner.contest_id"
                },
                {
                    "type": "INNER",
                    "join_table": "user_info",
                    "on_join_table": "user_info.id",
                    "on_from": "vote_for_video.user_id"
                }
            ],
            limit: limit
        }
    }

    getUserInfo(id) {
        return {
            select: "user_info.id, user_info.eth_address, user_info.display_name, user_info.created_at, (SELECT IFNULL(SUM(user_transaction.tokens), 0) FROM user_transaction WHERE user_id = user_info.id) AS tokens",
            where: "user_info.id = " + id
        }
    }

    getTransactions(data) {
        return {
            select: "user_transaction.id, user_transaction.transaction_hash, user_transaction.tokens, REPLACE(user_transaction.type, '_', ' ') as type, user_transaction.action,  user_transaction.created_at",
            where: "user_transaction.user_id = " + data.id,
            sort_by: "user_transaction.id",
            sort_order: "DESC",
            limit: data.limit
        }
    }

    updateUserInfo(data) {
        return {
            set: {
                "display_name": data.name
            },
            where: "id = " + data.id
        }
    }

    saveSetting(data) {
       return {
            set: {
                "beginner_prize": data.beginnerPrice,
                "expert_prize": data.expertPrice,
                "intermediate_prize": data.intermediatePrice,
                "snafu_prize": data.snafuPrice,
                "good_voter_prize": data.voterPrice,
                "add_topic_prize": data.addTopicPrice,
                "add_video_prize": data.addVideoPrice,
                "private_side_contest_prize": data.privateContestPrice,
                "public_side_contest_prize": data.publicContestPrice,
                "topic_vote_prize": data.topicVotePrice,
                "video_vote_prize": data.videoVotePrice,
            },
            where: "id = " + data.id
        }
    }
}
