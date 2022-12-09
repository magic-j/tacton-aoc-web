import type { LeaderBoard } from "../../types/leaderboard";
import type { Report } from "../../types/report";
import { formatSeconds } from "../time";

export function SecondStar(leaderboard: LeaderBoard): Report {

    const dayList = Object.values(leaderboard.members).flatMap(member => 
        Object.entries(member.completion_day_level).flatMap(([date, day]) => {
            const duration = (day["2"]?.get_star_ts??9999999999) - (day["1"].get_star_ts);
            return {
                name: member.name,
                title: `Day ${date} part B`,
                duration,
            }
        }));

    dayList.sort((a, b) => a.duration - b.duration);

    dayList.length = Math.min(dayList.length, 20);

    return {
        title: "Top 20 fastest part B (all days)",
        columns: ["Rank", "Name", "Title", "Time"],
        lines: dayList.map((day, i) => ([
            `${i + 1}`,
            day.name,
            day.title,
            formatSeconds(day.duration)
        ]))
    };

}
