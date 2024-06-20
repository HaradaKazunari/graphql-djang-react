import { HttpResponse, http } from "msw";

import { API_URL } from "@/config";
import { db } from "../db";

export const versatilityHandlers = [
  http.get(`${API_URL}/versatility/`, ({ request }) => {
    const url = new URL(request.url);
    const identify_code = url.searchParams.get("identify_code");
    if (!identify_code) return HttpResponse.json([]);

    const versatilitys = db.versatility.findMany({
      where: {
        identify_code: {
          equals: identify_code,
        },
      },
    });
    return HttpResponse.json(versatilitys);
  }),
];

export const versatilitySeeder = [
  {
    versatility_code: "1",
    identify_code: "POSITION_CODE",
    identify_name: "役職",
    key: "01",
    value: "社長",
  },
  {
    versatility_code: "2",
    identify_code: "POSITION_CODE",
    identify_name: "役職",
    key: "02",
    value: "専務",
  },
  {
    versatility_code: "3",
    identify_code: "POSITION_CODE",
    identify_name: "役職",
    key: "03",
    value: "部長",
  },
  {
    versatility_code: "4",
    identify_code: "POSITION_CODE",
    identify_name: "役職",
    key: "04",
    value: "課長",
  },
  {
    versatility_code: "5",
    identify_code: "POSITION_CODE",
    identify_name: "役職",
    key: "05",
    value: "係長",
  },
  {
    versatility_code: "6",
    identify_code: "POSITION_CODE",
    identify_name: "役職",
    key: "06",
    value: "リーダー",
  },
  {
    versatility_code: "7",
    identify_code: "POSITION_CODE",
    identify_name: "役職",
    key: "07",
    value: "一般社員",
  },
  {
    versatility_code: "8",
    identify_code: "UNIT",
    identify_name: "単位",
    key: "01",
    value: "式",
  },
  {
    versatility_code: "9",
    identify_code: "UNIT",
    identify_name: "単位",
    key: "03",
    value: "個",
  },
  {
    versatility_code: "10",
    identify_code: "UNIT",
    identify_name: "単位",
    key: "04",
    value: "枚",
  },
  {
    versatility_code: "11",
    identify_code: "UNIT",
    identify_name: "単位",
    key: "05",
    value: "本",
  },
  {
    versatility_code: "12",
    identify_code: "UNIT",
    identify_name: "単位",
    key: "06",
    value: "kg",
  },
  {
    versatility_code: "14",
    identify_code: "UNIT",
    identify_name: "単位",
    key: "07",
    value: "m",
  },
  {
    versatility_code: "15",
    identify_code: "UNIT",
    identify_name: "単位",
    key: "08",
    value: "㎡",
  },
  {
    versatility_code: "16",
    identify_code: "UNIT",
    identify_name: "単位",
    key: "09",
    value: "h",
  },
  {
    versatility_code: "17",
    identify_code: "UNIT",
    identify_name: "単位",
    key: "10",
    value: "人工",
  },
  {
    versatility_code: "18",
    identify_code: "UNIT",
    identify_name: "単位",
    key: "11",
    value: "泊",
  },
  {
    versatility_code: "19",
    identify_code: "CLOSE_CLASSIFICATION",
    identify_name: "締め区分",
    key: "01",
    value: "20日締め",
  },
  {
    versatility_code: "20",
    identify_code: "CLOSE_CLASSIFICATION",
    identify_name: "締め区分",
    key: "02",
    value: "末日締め",
  },
];

versatilitySeeder.map((item) => {
  db.versatility.create(item);
});
