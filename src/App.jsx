import { createContext, useContext, useEffect, useRef, useState } from "react";

const DAYS = [
  {
    id: 1,
    date: "4/24(金)",
    title: "札幌入り",
    subtitle: "前夜祭",
    km: 55,
    color: "#2a5a3e",
    stay: "プレミアホテル-CABIN-札幌",
    stayIcon: "🏨",
    stayPrice: "¥16,026（1人¥8,013）",
    stayNote: "札幌のど真ん中。ジンギスカンで煙まみれになった体を、セルフロウリュサウナと露天風呂で即リセットできる最高のスタート拠点。",
    mapQuery: "成吉思汗だるま本店+秀岳荘白石店+新千歳空港+すすきの",
    rentalCar: {
      company: "カースタレンタカー 新千歳空港店",
      tel: "0123-66-9153",
      addr: "北海道千歳市上長都886-8",
      pickup: "4/24(金) 13:00",
      pickupNote: "ANA61便到着後",
      dropoff: "4/30(木) 16:00",
      reservationNo: "R0PKQ2ZG",
      reservedBy: "神原 春太",
      price: "¥35,420（現地決済）",
      insurance: "免責補償・あんしん補償プラン加入済み",
      notes: [
        "空港到着後すぐに店舗へ電話すること。無料送迎バスで移動。",
        "カウンターで2名分の運転免許証を提示し、両名とも運転者登録を行うこと。",
      ],
    },
    flights: {
      outbound: {
        flight: "ANA61",
        route: "羽田（HND） → 新千歳（CTS）",
        departure: "11:00発",
        date: "4/24(金)",
        note: "2名共通",
      },
    },
    events: [
      {
        time: "12:35",
        title: "✈ 新千歳空港 着",
        type: "move",
        desc: "羽田から約1時間30分。到着後すぐにレンタカー店舗へ電話し、無料送迎バスで移動。手続き約1時間。4WD＋スタッドレス確認。ETCカードセット。道央道で札幌方面へ。",
      },
      {
        time: "14:30",
        title: "🍞 どんぐり",
        type: "food",
        tags: ["パン屋"],
        optional: true,
        desc: "北海道を代表する人気ベーカリーチェーン。道産小麦を使った手作りパンが充実。新千歳から札幌へ向かう途中に立ち寄れる。翌日以降の行動食・朝食ストックにも◎。\n\n📍「どんぐり 北広島店」などルート沿い店舗をMapsで確認。",
        hours: "店舗により異なる（7:00〜19:00頃）",
      },
      {
        time: "15:30",
        title: "秀岳荘 白石店",
        type: "spot",
        tags: ["ショップ"],
        desc: "北海道最大級アウトドア専門店。トレッキングポール長さ合わせ、レインウェア防水チェック、行動食補充。モンベル・ノースフェイスの品揃えが本州より充実。北海道限定グッズもお土産候補に。",
        hours: "10:30〜19:30（水曜定休）",
        addr: "札幌市白石区本通1丁目南2-14",
      },
      {
        time: "19:00",
        title: "🔥 だるま 本店",
        type: "food",
        tags: ["ジンギスカン"],
        important: true,
        desc: "昭和29年(1954)創業。カウンター14席。七輪炭火で焼く生マトンは別次元の旨さ。秘伝の甘辛タレは中毒性あり。〆は「タレ茶漬け」。\n\n⚠ 行列1h覚悟。21時以降が狙い目。匂いが服につくので「生贄の服」で行くこと。食後は圧縮袋に封印。予約不可・現金のみ。",
        price: "¥2,000〜4,000",
        hours: "17:00〜翌5:00（無休）",
        tel: "011-552-6013",
        addr: "南5条西4 クリスタルビル1F",
      },
    ],
    gourmet: [
      {
        name: "セイコーマート",
        note: "北海道限定コンビニ。ホットシェフのフライドチキンとカツ丼が道民のソウルフード。ホテル前の買い出しに。",
        tags: ["コンビニ"],
      },
    ],
  },
  {
    id: 2,
    date: "4/25(土)",
    title: "オロロンライン",
    subtitle: "北上330km",
    km: 330,
    color: "#5ba4c9",
    stay: "ドーミーイン稚内",
    stayIcon: "🏨",
    stayPrice: "¥15,622（1人¥7,811）",
    stayNote: "日本最北端のサウナとキンキンに冷えた水風呂で、320kmロングドライブの疲労を完全に消し飛ばす。",
    mapQuery: "札幌+小平町+天塩+稚内",
    events: [
      {
        time: "08:00",
        title: "札幌出発",
        type: "move",
        desc: "国道231→232号で日本海沿いを北上。信号ほぼなし、右に日本海、左に原野。「日本一の直線道路」区間もあり、北海道ドライブの醍醐味を最初に体感する日。",
      },
      {
        time: "11:30",
        title: "🍣 おびら鰊番屋",
        type: "food",
        tags: ["海鮮"],
        desc: "重要文化財・旧花田家番屋に隣接。海鮮丼・ニシンそば。2Fは無料資料館でニシン漁の歴史展示。ドライブ中間地点の最適な休憩ポイント。",
        hours: "9:00〜17:00",
        addr: "留萌郡小平町字鬼鹿広富",
      },
      {
        time: "14:00",
        title: "初山別〜天塩",
        type: "spot",
        tags: ["絶景"],
        desc: "オロロンラインのハイライト。巨大風車群が立ち並び、天気が良ければ利尻富士のシルエットが見える。日本海に沈む夕日が圧巻。窓を開けて潮風を感じたい区間。",
      },
      {
        time: "16:00",
        title: "🏨 ドーミーイン稚内",
        type: "stay",
        desc: "日本最北のドーミーイン。最上階に天然温泉大浴場。21:30〜23:00の無料「夜鳴きそば」。2連泊なので翌日の礼文島行きは荷物を部屋に置いたまま出発可。駐車場はタワー式（先着順）。",
        addr: "稚内市中央2-7-13",
        tel: "0162-24-5489",
      },
      {
        time: "19:00",
        title: "🐙 稚内で夕食",
        type: "food",
        tags: ["タコしゃぶ"],
        desc: "稚内名物タコしゃぶ。宗谷海峡のミズダコを薄くスライスし、昆布だしにサッとくぐらせてごまダレや酢味噌で。半生がベスト。〆はラーメンか雑炊。竹ちゃんか車屋・源氏で。",
      },
    ],
    gourmet: [
      {
        name: "北の味心 竹ちゃん",
        note: "稚内駅徒歩5分。日本最北端の寿司処。タコしゃぶ+ウニ+カニしゃぶ。¥4,200〜コースあり。予約推奨。",
        tags: ["タコしゃぶ", "寿司"],
        tel: "0162-22-7130",
      },
      {
        name: "車屋・源氏",
        note: "タコしゃぶ発祥の店。特製酢味噌のタレ。全247席の大箱。予約は19時入店まで。",
        tags: ["タコしゃぶ", "元祖"],
        tel: "0162-22-3177",
      },
      {
        name: "稚内牛乳ソフト",
        note: "副港市場。65℃低温殺菌ノンホモの濃厚ソフトクリーム。ここでしか味わえない。",
        tags: ["スイーツ"],
      },
    ],
  },
  {
    id: 3,
    date: "4/26(日)",
    title: "礼文島",
    subtitle: "★岬めぐり縦走",
    km: 0,
    color: "#9b7ec8",
    stay: "ドーミーイン稚内（連泊）",
    stayIcon: "🏨",
    stayPrice: "¥16,560（1人¥8,280）",
    stayNote: "最大の戦略。翌朝は荷物をすべて部屋に置いて「完全な手ぶら状態」で礼文島へ突撃。フェリー乗り場激近のベースキャンプ。",
    highlight: '最北の離島「礼文島」。原付でスコトン岬に置いて歩き、海を見ながら12.4kmを縦走。ゴール後は歩いて原付を回収する自由な旅。',
    mapQuery: "稚内港+礼文島+スコトン岬+澄海岬+香深港",
    trek: { distance: "12.4km", time: "約3h15m", level: "★★★★ 健脚", elevation: "180m" },
    events: [
      {
        time: "05:30",
        title: "🚢 稚内港 乗船",
        type: "move",
        important: true,
        desc: "ドーミーインから港まで車5分。連泊なので軽装備だけ持って出発。乗船手続きは6:00開始（6:35発）。朝食は乗船前に稚内のコンビニで調達しておく。\n\n⚠ 前日夜にフェリー運航確認（heartlandferry.jp）。強風で欠航リスクあり。",
      },
      {
        time: "08:30",
        title: "🛵 Cat Rock 原付レンタル",
        type: "move",
        important: true,
        desc: "香深港下船後すぐCat Rockへ。原付2台を借りて荷物をデポ。\n水1.5L×2本・行動食はここで最終確認。\n\n9:00頃出発→原付でスコトン岬へ（約30分）。スコトン岬の駐車場に原付を置いてトレッキング開始。",
        tel: "090-7517-1095",
        hours: "前日までに電話予約必須",
        addr: "礼文町香深（香深港近く）",
      },
      {
        time: "09:00",
        title: "🥾 岬めぐりコース スタート",
        type: "spot",
        tags: ["トレッキング"],
        important: true,
        desc: "スコトン岬の駐車場に原付を置き、南へ縦走開始（健脚ペース 約3h15m）。\n\n① 09:00 スコトン岬 → ゴロタ岬（55分）\n② 09:55 ★ゴロタ岬（360°絶景・10分滞在）\n③ ゴロタ岬 → 鉄府（75分）\n④ 11:10 鉄府集落（トイレ・5分休憩）\n⑤ 鉄府 → 澄海岬（45分）\n⑥ 11:55 ★澄海岬・西上泊（礼文ブルー・売店あり・15分）\n⑦ 西上泊 → 浜中（50分）\n⑧ 12:45 浜中バス停 ゴール 🎉\n\n常に強風で体感-5〜-10°C。水1.5L持参。トイレはスコトン岬・鉄府・澄海岬のみ。携帯はほぼ圏外。ヒグマ・ヘビなし。",
      },
      {
        time: "12:45",
        title: "🚶 浜中→スコトン岬 原付回収",
        type: "move",
        desc: "浜中バス停から車道（全舗装）を歩いてスコトン岬へ原付回収（5.5km・約80分）。\n\n歩きながら景色を楽しみつつ、14:10頃スコトン岬着→原付で香深港へ（30分）→14:45頃到着。\n\n体力・天候次第でタクシーに変更してもOK。礼文島ハイヤー：0163-86-1511",
        tel: "0163-86-1511",
      },
      {
        time: "14:45",
        title: "🦔 ウニ丼（海鮮処かふか）",
        type: "food",
        tags: ["ウニ丼"],
        desc: "縦走完了のご褒美。礼文のバフンウニ丼でエネルギー補給。4月末はシーズンギリギリ（旬は6月〜）だが食べられる確率は高い。\n\n⚠ 予約推奨（0163-86-1228）。15:30には出て温泉へ。",
        tel: "0163-86-1228",
        price: "¥2,500〜4,000",
        hours: "11:00〜15:00頃（要確認）",
      },
      {
        time: "15:30",
        title: "♨ うすゆきの湯",
        type: "onsen",
        desc: "香深港から徒歩3分。礼文島唯一の天然温泉で脚の疲労を即リセット。16:20には出て原付返却→フェリーターミナルへ。\n\n⚠ 17:05フェリーに乗り遅れると島で一泊確定。",
        tel: "0163-86-2345",
        addr: "礼文町香深村ワウシ",
        price: "¥600",
        hours: "12:00〜22:00（受付21:30まで）",
      },
      {
        time: "17:05",
        title: "🚢 礼文→稚内 フェリー",
        type: "move",
        desc: "最終フェリー（香深 17:05発 → 稚内 19:00着）。ドーミーインへ直行。夜鳴きそば（21:30〜23:00）で回復し、翌日の激走350kmに備えて早寝。",
      },
    ],
    warningGroups: [
      {
        title: "出発前必須",
        icon: "✅",
        accent: "#d4553a",
        items: [
          { text: "コース通行状況を確認（4月末は残雪で閉鎖の可能性あり）", url: "https://rebun-trail.jp", urlLabel: "rebun-trail.jp" },
          { text: "水1.5L×2本・行動食を稚内のコンビニで事前調達（コース中に補給ポイントなし）" },
        ],
      },
      {
        title: "当日の注意",
        icon: "⚠️",
        accent: "#8a7f72",
        items: [
          { text: "常に強風。体感-5〜-10°C。防風アウター・手袋・ネックウォーマー必須" },
          { text: "コース中ほぼ圏外。地図はオフラインDLが必須" },
          { text: "フェリー欠航時は前日夜にプランBを用意", url: "https://heartlandferry.jp", urlLabel: "heartlandferry.jp" },
        ],
      },
      {
        title: "コース短縮プラン",
        icon: "🚪",
        accent: "#5ba4c9",
        items: [
          { text: "鉄府集落（11:10）が最終離脱ポイント。時間・体力不安ならここで車道へ" },
          { text: "ゴロタ岬で折り返す場合、江戸屋バス停（入口から徒歩20分）からバス離脱可" },
          { text: "浜中ゴール後の回収ルートで不安があればタクシーに切り替えOK", tel: "0163-86-1511", telLabel: "礼文島ハイヤー" },
        ],
      },
    ],
    gourmet: [
      {
        name: "海鮮処 かふか",
        note: "ウニ丼のメイン候補。予約推奨（0163-86-1228）。14:45〜15:30に組み込み済み。",
        tags: ["ウニ丼"],
        tel: "0163-86-1228",
      },
      {
        name: "炉ばた ちどり",
        note: "ホッケちゃんちゃん焼き元祖。香深港徒歩5分。炭火+味噌+生ビール。時間があれば夕食前のフェリー待ちに。",
        tags: ["ホッケ", "香深"],
        tel: "0163-86-1721",
      },
    ],
  },
  {
    id: 4,
    date: "4/27(月)",
    title: "最北端→オホーツク",
    subtitle: "激走350km",
    km: 350,
    color: "#d4553a",
    stay: "コンフォートホテル北見",
    stayIcon: "🏨",
    stayPrice: "¥8,447（1人¥4,223）✨ バグレベルの安さ",
    stayNote: "朝食無料！板門店から近く、特上サガリで煙まみれになってもすぐ帰って寝られる完璧な立地。",
    mapQuery: "宗谷岬+猿払+紋別+北見",
    events: [
      {
        time: "07:30",
        title: "📍 宗谷岬",
        type: "spot",
        tags: ["最北端"],
        important: true,
        desc: "日本最北端の地。稚内から車30分。朝は観光客ゼロで撮影し放題。間宮林蔵像、平和の鐘あり。\n\n白い道（約3km）—ホタテ貝殻を敷いた真っ白な小道。宗谷丘陵を歩ける。天気良ければサハリンが見える。所要40分〜1h。",
      },
      { time: "10:00", title: "🐚 猿払ホタテ", type: "food", tags: ["ホタテ"], desc: "道の駅さるふつ公園。日本一のホタテ水揚量。ホタテバーガーが名物。貝柱ゴロッと入った贅沢バーガー。" },
      { time: "13:00", title: "紋別 カニ爪", type: "spot", tags: ["休憩"], desc: "巨大カニ爪オブジェ（高さ12m）で記念撮影。宗谷→北見の中間地点。運転交代ポイント。出塚水産の手揚げかまぼこをおやつに。" },
      {
        time: "18:00",
        title: "🥩 板門店",
        type: "food",
        tags: ["焼肉"],
        important: true,
        desc: "1971年創業の老舗。食べログ北見焼肉ランキング2位(3.52)。上質な肉を塩胡椒でシンプルに。サガリ・ホルモン・レバー・こぶくろなど内臓系が充実。テールスープも優しい味わい。\n\n〆は名物「目丼」— これを食べずに帰るな。焼肉の後にご飯もの…？と思うけど、北見では目丼で1日を締めるのが常識。\n\n月曜営業！（日曜・祝日定休）深夜3時半まで。カウンターに座れたら最高。",
        price: "¥3,000〜4,500",
        hours: "18:00〜翌3:30（日祝定休）",
        tel: "0157-24-2626",
        addr: "北見市北7条西4丁目8-1",
      },
    ],
    warnings: [
      "板門店は日曜・祝日定休。4/27(月)は営業OK！予約はAutoReserveから可能",
      "🦌 エゾシカ注意。夕暮れ時最危険。80km/h以下で",
      "紋別あたりで休憩+運転交代を",
    ],
    gourmet: [
      {
        name: "四条ホルモン",
        note: "食べログ焼肉百名店。サガリ+豚ホルモン+生ダレ+ハッカハイボール。月曜定休なのでD4(月)は行けないが、北見焼肉の代名詞。次回北見に来たら必ず。",
        tags: ["焼肉", "月曜定休"],
        tel: "0157-23-1927",
      },
      {
        name: "百萬力 北見本店",
        note: "食べログ北見焼肉1位(3.59)。精肉店直営の炉端スタイル。囲炉裏で炭火焼き。黒毛和牛ホルモン常時20種以上。ユッケもあり。予算¥6,000〜。オシャレ路線。",
        tags: ["焼肉", "1位"],
        tel: "0157-31-5544",
      },
      {
        name: "出塚水産（紋別）",
        note: "手揚げかまぼこ。揚げたてアツアツでドライブのおやつに。",
        tags: ["おやつ"],
      },
    ],
  },
  {
    id: 5,
    date: "4/28(火)",
    title: "知床→釧路",
    subtitle: "★世界遺産 390km",
    km: 390,
    color: "#1a3a2a",
    stay: "ドーミーインPREMIUM釧路",
    stayIcon: "🏨",
    stayPrice: "¥15,621（1人¥7,810）",
    stayNote: "最上階の天然温泉「幣舞の湯」とサウナで、翌日のバイクツーリングに向けてフィジカルを整える。",
    highlight: "世界遺産制覇へ。知床の原始の自然を踏み、神の子池のコバルトブルーに出会い、幣舞橋の夕日で締めくくる。",
    mapQuery: "北見+オシンコシンの滝+知床五湖+神の子池+摩周湖+釧路",
    events: [
      { time: "07:00", title: "北見出発", type: "move", desc: "ウトロまで130km/2h。朝の道東は路面凍結リスクあり。" },
      { time: "08:30", title: "🌊 オシンコシンの滝", type: "spot", tags: ["知床八景"], desc: "知床八景。国道沿い駐車場すぐ。「双美の滝」の二筋の流れ。階段で中段展望台へ行くと水しぶきを間近に。滞在15〜20分。" },
      {
        time: "09:30",
        title: "🌿 知床五湖",
        type: "spot",
        tags: ["世界遺産"],
        important: true,
        desc: "世界遺産コアゾーン。原生林に囲まれた5つの湖。\n\n【高架木道】無料/40min。一湖のみ。電気柵でヒグマ対策済。年中開放。\n【地上遊歩道】全5湖/約3km。4月下旬はガイドツアー必須の場合あり。goko.go.jpで確認。\n\n高架木道だけでも知床連山＋湖の絶景は十分。",
      },
      { time: "10:30", title: "知床世界遺産センター", type: "spot", tags: ["世界遺産"], desc: "無料。知床の生態系・ヒグマ展示。世界遺産チェックの証拠写真はここで。\n⚠ 火曜定休の場合あり。事前確認を。" },
      { time: "12:00", title: "ウトロ昼食", type: "food", tags: ["海鮮"], desc: "くまのやのホッケ定食は身が分厚い。波飛沫の知床三色丼（ウニ・いくら・サケ）も◎。12:30には出発。" },
      {
        time: "14:00",
        title: "💎 神の子池",
        type: "spot",
        tags: ["神秘"],
        important: true,
        desc: "摩周湖の伏流水が湧く池。水深5m底まで見える透明度。コバルトブルーの湖底に腐らない倒木が沈む異世界。オショロコマが泳ぐ。無料。\n\n⚠ 未舗装砂利道2km。SUVなら問題なし。4月末は残雪で通行不可の場合あり。清里町観光協会(0152-25-4111)に電話確認を。",
      },
      { time: "15:00", title: "🌫 摩周湖", type: "spot", tags: ["絶景"], desc: "霧の摩周湖。晴れると世界屈指の透明度（バイカル湖に次ぐ世界2位記録）の深い青。\n駐車場¥500。何も見えないこともあるが、それもまた摩周湖。" },
      { time: "16:00", title: "♨ コタン温泉", type: "onsen", optional: true, desc: "屈斜路湖畔の無料露天風呂。湖に浸かる絶景温泉。混浴（水着可）。\n※時間余裕ある場合のみ。省略で1hバッファ。" },
      { time: "18:15", title: "🌅 幣舞橋の夕日", type: "spot", tags: ["夕日"], desc: "世界三大夕日。4月下旬の日没18:15頃。四季の像が並ぶ。釧路は霧が多いので見えるかは運次第。" },
      {
        time: "19:30",
        title: "🐟 炉端焼き",
        type: "food",
        tags: ["炉端"],
        important: true,
        desc: "「炉ばた」60年以上の歴史。おばあちゃんがヘラで料理を運ぶスタイル。ホッケ・ししゃも・カキ。時価多く¥5,000〜覚悟。\n\n⚠ 日曜定休。予約不可、17時開店に並ぶのが確実。代替は炉ばた煉瓦。",
        tel: "0154-22-6636",
        hours: "17:00〜23:00（日曜定休）",
      },
    ],
    warnings: [
      "⚠ 知床横断道路は冬季閉鎖中。ウトロ側のみ",
      "⚠ 神の子池は未舗装2km＋残雪リスク",
      "🔴 最もハード（12h行動）。運転交代必須",
      "コタン温泉は時間調整弁。省略で1h余裕",
    ],
    gourmet: [
      { name: "荒磯料理 くまのや", note: "ウトロ漁師料理。ホッケ定食がでかい。", tags: ["ウトロ"] },
      { name: "波飛沫", note: "ウトロ港前。知床三色丼（ウニ・いくら・サケ）。", tags: ["ウトロ"] },
      { name: "炉ばた煉瓦", note: "釧路の代替。煉瓦倉庫。予約しやすい。", tags: ["釧路"] },
      { name: "和商市場 勝手丼", note: "好きなネタを載せる市場スタイル海鮮丼。朝6時〜。D6朝にも。", tags: ["釧路", "朝食"] },
    ],
  },
  {
    id: 6,
    date: "4/29(水祝)",
    title: "湿原ツーリング→十勝",
    subtitle: "★聖地巡礼と豚丼",
    km: 250,
    color: "#8b6f47",
    stay: "プレミアホテル-CABIN-帯広",
    stayIcon: "🏨",
    stayPrice: "¥15,517（1人¥7,758）",
    stayNote: "世界的に珍しいモール温泉（美人の湯）で凍えた体を芯から溶かす。帯広駅前で翌朝の六花亭・ぱんちょうに歩いて行ける。",
    highlight: "旅のクライマックス。釧路湿原をバイクで駆け抜け、帯広の極上豚丼を経て、美人の湯で癒やされる。",
    mapQuery: "釧路+細岡駅+塘路湖+鶴居村+帯広+十勝川温泉",
    bikeRental: {
      shop: "Moto-Technix 釧路店",
      bikes: [
        { rider: "細岡", model: "KTM 390 DUKE" },
        { rider: "神原", model: "Honda GB350" },
      ],
      helmet: "オンロードヘルメット L",
      start: "09:00",
      end: "17:00",
      notes: [
        "完全防寒装備で出撃。4月の北海道バイクは想像以上に寒い（防風グローブ・インナータイツ必須）",
        "ぱんちょうの閉店（19時前）に間に合わせるため15:30〜16:00に返却推奨",
      ],
    },
    events: [
      {
        time: "09:00",
        title: "🏍 バイクレンタル出発",
        type: "spot",
        tags: ["バイク"],
        important: true,
        desc: "Moto-Technix 釧路店でピックアップ（09:00〜17:00）。細岡: KTM 390DUKE / 神原: Honda GB350。ヘルメット（オンロードL）は店で受け取り。完全防寒装備で出撃！",
      },
      {
        time: "10:00",
        title: "🎯 細岡駅",
        type: "spot",
        tags: ["聖地"],
        desc: "東側のルート（国道391号）を北上し、聖地・細岡駅へ。無人駅にバイクと一緒に記念撮影！",
      },
      { 
        time: "11:00", 
        title: "🌊 塘路湖・シラルトロ湖", 
        type: "move", 
        desc: "さらに北上。右手に美しい湖、左手に湿原を見ながら走る、最高に気持ちいいレイクサイド・ワインディングロード。" 
      },
      { 
        time: "12:30", 
        title: "🍜 ランチ (標茶〜鶴居村)", 
        type: "food", 
        desc: "湿原の北側をぐるっと回り込み、西側の「鶴居村」へ抜ける。道中のカフェや食堂で、冷えた体を温めるカレーやラーメンを。" 
      },
      { 
        time: "14:00", 
        title: "🛣 道道53号 南下", 
        type: "move", 
        tags: ["絶景路"],
        desc: "鶴居村から釧路市内へ戻る「超・直線道路」。見渡す限りの直線が続き、風を切って走る爽快感MAX。交通量も少なく北海道らしさ全開。" 
      },
      {
        time: "15:30",
        title: "🏍 バイク返却",
        type: "spot",
        important: true,
        desc: "Moto-Technix釧路店に帰還・返却（レンタルは17時まで）。4月の長時間ライディングは風冷えで体力消耗が激しいため、15:30〜16:00の返却が◎。帯広まで2時間かかるのでぱんちょうの閉店（19時前）に逆算すると、16:00出発が限界ライン。",
      },
      { 
        time: "16:00", 
        title: "🚗 釧路出発", 
        type: "move", 
        desc: "レンタカーの車内で暖を取りながら、道東自動車道で帯広へ（約2時間）。" 
      },
      {
        time: "18:00",
        title: "🐷 ぱんちょう",
        type: "food",
        tags: ["豚丼"],
        important: true,
        desc: "1933年創業。炭火ロース+甘辛タレ。\n\n⚠ 19時閉店だが肉がなくなると早めに閉まるため、18時台に到着して並ぶのが必勝法。極上の豚丼でツーリングの消費カロリーを補給！現金のみ。",
      },
      {
        time: "19:30",
        title: "♨ 十勝川温泉",
        type: "stay",
        tags: ["モール温泉"],
        desc: "冷え切って疲れた体を、最高級の植物性温泉「美人の湯」で溶かす。旅の最後の夜を締める至福の時間。",
      },
    ],
    warnings: ["長時間のバイクは体力消耗大。無理せず15時半返却を厳守", "ぱんちょうは19時前に閉まる可能性大"],
    gourmet: [
      { name: "クランベリー 本店", note: "帯広。さつまいも丸ごとくりぬいたスイートポテト。", tags: ["帯広"] },
    ],
  },
  {
    id: 7,
    date: "4/30(木)",
    title: "帯広食い倒れ＆帰還",
    subtitle: "ありがとう北海道",
    km: 180,
    color: "#5c4a2f",
    stay: null,
    stayIcon: null,
    mapQuery: "帯広駅+新千歳空港温泉+新千歳空港",
    flights: {
      returns: [
        { name: "細岡", flight: "ANA1280", route: "新千歳 → 福岡（FUK）", departure: "18:20発" },
        { name: "神原", flight: "ANA578",  route: "新千歳 → UKB",          departure: "18:35発" },
      ],
    },
    events: [
      { 
        time: "09:30", 
        title: "🍰 六花亭 帯広本店", 
        type: "food", 
        tags: ["朝スイーツ"], 
        desc: "本店限定「サクサクパイ」とマルセイアイスサンドで朝の血糖値を爆上げ。" 
      },
      { 
        time: "11:00", 
        title: "🐷 ぱんちょう (予備)", 
        type: "food", 
        tags: ["豚丼"], 
        optional: true,
        desc: "前日夜に食べられなかった場合の保険。開店（11:00）と同時に突撃して、肉が丼からはみ出る「華（はな）」を食らう。" 
      },
      { 
        time: "12:00", 
        title: "🍛 インデアンカレー", 
        type: "food", 
        tags: ["B級グルメ"], 
        desc: "もし腹に余裕があれば、帯広市民が「鍋を持参して買いに来る」という伝説のローカルチェーンへ。ドロッドロの濃厚カレーは男旅の締めに最高。（※お土産のルーだけ買うのもアリ！）" 
      },
      { 
        time: "13:30", 
        title: "🚗 帯広出発", 
        type: "move", 
        desc: "帯広から道東自動車道で新千歳へ（約2時間半のドライブ）。到着前にレンタカーのガソリン満タン返しを忘れずに。" 
      },
      {
        time: "16:00",
        title: "🚗 レンタカー返却",
        type: "move",
        desc: "新千歳空港 着。カースタレンタカー（予約番号: R0PKQ2ZG）を返却。ガソリン満タン確認を忘れずに。送迎バスで空港ターミナルへ（約10分）。",
      },
      { 
        time: "16:30", 
        title: "📦 荷物発送ミッション", 
        type: "spot", 
        important: true,
        desc: "ANAなので重量制限はないが、「地元での1週間を身軽に過ごすため」に、泥だらけのトレッキング靴やアウターなど、北海道の重装備一式をクロネコヤマト等で平塚の自宅へ発送する。" 
      },
      { 
        time: "17:00", 
        title: "♨ 新千歳空港温泉", 
        type: "onsen", 
        tags: ["サウナ"],
        desc: "空港内にある本格的な天然温泉とサウナ。フライトまでの1時間、最後のサウナで汗を流し、風呂上がりのサッポロクラシック（生ビール）をキメるという、神がかったエンディングが可能。" 
      },
      {
        time: "18:20〜",
        title: "✈ 新千歳 解散・帰路",
        type: "move",
        desc: "細岡: ANA1280（18:20発）→ 福岡（FUK）\n神原: ANA578（18:35発）→ UKB\n\n体はポカポカ、腹はパンパン、荷物は最小限の最強状態で帰還。ありがとう北海道。",
      },
    ],
    gourmet: [
      { name: "きのとや（空港内）", note: "焼きたてチーズタルト。搭乗前の最後のスイーツ。", tags: ["空港"] },
    ],
  },
];

const CHECKLIST = [
  {
    cat: "👕 上半身ウェア",
    items: [
      { name: "【アウター】防水・防風ハードシェル", sub: "ゴアテックス等のマウンテンパーカー。礼文島の暴風と釧路バイクの風を完全シャットアウトする「鎧」。" },
      { name: "【ミドル】薄手ダウン＆フリース 各1", sub: "インナーダウン（ユニクロULダウン等も可）＋フリースや厚手スウェット。" },
      { name: "【ベース】吸湿速乾インナー 3〜4着", sub: "ヒートテックやメリノウール。道中で1回洗濯する想定。" },
    ],
  },
  {
    cat: "👖 ボトムス＆フットウェア",
    items: [
      { name: "ストレッチパンツ 1〜2着", sub: "トレッキングと長時間運転を両立。※ジーンズは濡れると乾かないのでNG！" },
      { name: "防寒タイツ（極暖等）1〜2着", sub: "※超重要: 4月の北海道でバイクに乗ると下半身が凍る。ズボン下の防寒タイツは絶対必須。" },
      { name: "リラックス着（短パン/スウェット）", sub: "ホテル内移動、サウナ上がり用。" },
      { name: "防水トレッキングシューズ", sub: "礼文12kmを歩き、そのまま運転も。出発時からこれを履く。" },
    ],
  },
  {
    cat: "🧤 防寒小物＆アクティビティ",
    items: [
      { name: "防風グローブ", sub: "バイク＆礼文兼用。冬用バイクグローブかスノボ用薄手手袋。" },
      { name: "ネックウォーマー＆ニット帽", sub: "バイクや岬の強風対策。マフラーは風で飛ぶのでNG。" },
      { name: "デイパック 15〜20L", sub: "礼文＆知床で飲み物と雨具を入れる用。メインバッグとは別に。" },
    ],
  },
  {
    cat: "🍖 特殊ミッション装備",
    items: [{ name: "「生贄」の服 上下＋圧縮袋", sub: "だるまのジンギスカンと北見焼肉で煙を全吸収させる服。食後はジップロック圧縮袋に完全密封。" }],
  },
  {
    cat: "🏍 バイク（D6）",
    items: [
      { name: "普通二輪免許", sub: "免許証携帯必須。" },
      { name: "Moto-Technix 予約済み", sub: "4/29 9:00-17:00 釧路市内にて。" },
    ],
  },
  {
    cat: "🚗 ドライブ＆一般",
    items: [
      { name: "運転免許証", sub: "忘れたら旅が終わる。" },
      { name: "偏光サングラス", sub: "長距離＆残雪反射対策。" },
      { name: "モバイルバッテリー 20,000mAh+", sub: "寒さで消耗早い。" },
      { name: "オフラインマップDL済", sub: "礼文・湿原の圏外対策。" },
      { name: "常備薬・酔い止め", sub: "フェリー対策。" },
      { name: "日焼け止め", sub: "4月でも紫外線強い。" },
    ],
  },
];

const TIPS = [
  { icon: "🦌", title: "エゾシカ飛び出し", text: "年間数千件の衝突事故。夕暮れ〜夜明けが最危険。制限速度厳守。" },
  { icon: "🧊", title: "朝晩の路面凍結", text: "道東は朝晩氷点下。橋・トンネル出口はブラックアイスバーン。" },
  { icon: "⛽", title: "ガソリンスタンド", text: "地方は間隔50〜100km。18時閉店も。半分切ったら即給油。" },
  { icon: "📶", title: "携帯電波", text: "礼文・オロロンライン一部・釧路湿原で圏外。" },
  { icon: "🚗", title: "速度超過", text: "直線が快適すぎて飛ばしがち。+20km/hで一発免停。" },
  { icon: "🌊", title: "フェリー欠航", text: "強風で欠航あり。前日夜に運航確認。プランBを。" },
];
const EMER = [
  { l: "警察", v: "110" },
  { l: "消防・救急", v: "119" },
  { l: "JAF", v: "0570-00-8139" },
  { l: "道路情報", v: "011-709-2311" },
];

/* ── Design Tokens ── */
const THEMES = {
  ds2: {
    bg:"#09090b", card:"#0f0f12", card2:"#141418",
    border:"rgba(255,255,255,0.06)", borderMd:"rgba(255,255,255,0.11)",
    yel:"#facc15", yelBg:"rgba(250,204,21,0.07)",  yelBd:"rgba(250,204,21,0.22)",
    blu:"#60a5fa", bluBg:"rgba(96,165,250,0.07)",   bluBd:"rgba(96,165,250,0.22)",
    red:"#ef4444", redBg:"rgba(239,68,68,0.07)",    redBd:"rgba(239,68,68,0.22)",
    text:"#d4d4d8", text2:"#71717a", text3:"#3f3f46",
    mono:"'Space Mono','Fira Code','Consolas',monospace",
    sans:"'Inter',system-ui,-apple-system,sans-serif",
    radius:0,
  },
  warm: {
    bg:"#faf8f5", card:"#ffffff", card2:"#f5ede0",
    border:"rgba(139,111,71,0.10)", borderMd:"rgba(139,111,71,0.20)",
    yel:"#d4553a", yelBg:"rgba(212,85,58,0.05)",   yelBd:"rgba(212,85,58,0.18)",
    blu:"#2a5a3e", bluBg:"rgba(42,90,62,0.06)",    bluBd:"rgba(42,90,62,0.18)",
    red:"#d4553a", redBg:"rgba(212,85,58,0.04)",   redBd:"rgba(212,85,58,0.12)",
    text:"#1a3a2a", text2:"#5c5347", text3:"#8a7f72",
    mono:"'M PLUS Rounded 1c',sans-serif",
    sans:"'Zen Maru Gothic',sans-serif",
    radius:10,
  },
};

const ThemeContext = createContext(THEMES.ds2);
const useT = () => useContext(ThemeContext);

/* ETYPE: label only — colors resolved from theme at render time */
const ETYPE = {
  food:  "PROVISIONS",
  spot:  "LOCATION",
  stay:  "QUARTERS",
  onsen: "FACILITY",
  move:  "TRANSIT",
};

/* ── Components ── */
function Anim({ children, delay = 0 }) {
  const r = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = r.current;
    if (!el) return;
    const o = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) { setV(true); o.disconnect(); }
      },
      { threshold: 0.05 },
    );
    o.observe(el);
    return () => o.disconnect();
  }, []);
  return (
    <div
      ref={r}
      style={{
        opacity: v ? 1 : 0,
        transform: v ? "translateY(0)" : "translateY(10px)",
        transition: `opacity .4s ease ${delay}s, transform .4s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function Mono({ children, color, size = 9, style = {} }) {
  const T = useT();
  const c = color ?? T.text2;
  return (
    <span style={{ fontFamily: T.mono, fontSize: size, color: c, letterSpacing: "0.08em", ...style }}>
      {children}
    </span>
  );
}

function Badge({ children, color }) {
  const T = useT();
  const c = color ?? T.text2;
  return (
    <span style={{
      fontFamily: T.mono, fontSize: 9, color: c,
      border: `1px solid ${c}44`,
      padding: "1px 5px", letterSpacing: "0.07em",
      borderRadius: T.radius / 2,
    }}>
      {children}
    </span>
  );
}

function EventCard({ ev, idx }) {
  const T = useT();
  const [open, setOpen] = useState(false);
  const ECOLOR = { food:T.yel, spot:T.blu, stay:T.blu, onsen:T.blu, move:T.text2 };
  const label = ETYPE[ev.type] || ETYPE.move;
  const typeColor = ECOLOR[ev.type] || T.text2;
  const accent = ev.important ? T.red : typeColor;
  return (
    <Anim delay={idx * 0.04}>
      <div
        onClick={() => setOpen(!open)}
        style={{
          borderLeft: `2px solid ${accent}`,
          background: open ? T.card2 : T.card,
          padding: "10px 14px",
          marginTop: 3,
          cursor: "pointer",
          transition: "background .15s",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap", marginBottom: 4 }}>
              <Mono color={accent} size={9} style={{ letterSpacing: "0.1em" }}>
                {ev.important ? "! " : "▸ "}{label}
              </Mono>
              {ev.important && <Badge color={T.red}>CRITICAL</Badge>}
              {ev.optional && <Badge color={T.text2}>OPTIONAL</Badge>}
            </div>
            <div style={{ fontSize: 14, fontWeight: 600, color: ev.type === "food" ? T.yel : T.text, fontFamily: T.sans, lineHeight: 1.3 }}>
              {ev.title}
            </div>
            {ev.tags && (
              <div style={{ display: "flex", gap: 4, marginTop: 5, flexWrap: "wrap" }}>
                {ev.tags.map((t) => <Badge key={t} color={accent}>{t}</Badge>)}
              </div>
            )}
          </div>
          <div style={{ textAlign: "right", flexShrink: 0 }}>
            <div style={{ fontFamily: T.mono, fontSize: 11, color: T.text2 }}>{ev.time}</div>
            <div style={{ fontSize: 10, color: T.text3, marginTop: 2, transition: "transform .3s", transform: open ? "rotate(180deg)" : "none", display: "inline-block" }}>▾</div>
          </div>
        </div>
        <div style={{
          maxHeight: open ? 2000 : 0, overflow: "hidden",
          opacity: open ? 1 : 0,
          transitionProperty: "max-height, opacity",
          transitionDuration: open ? ".5s, .3s" : ".3s, .2s",
        }}>
          <div style={{ marginTop: 10, paddingTop: 10, borderTop: `1px solid ${T.border}` }}>
            <div style={{ fontSize: 12, color: T.text2, lineHeight: 1.9, whiteSpace: "pre-line", fontFamily: T.sans }}>{ev.desc}</div>
            {(ev.price || ev.hours || ev.tel || ev.addr) && (
              <div style={{ display: "flex", flexDirection: "column", gap: 5, marginTop: 10, padding: "8px 10px", background: T.bg, border: `1px solid ${T.border}` }}>
                {ev.price && (
                  <div style={{ display: "flex", gap: 10 }}>
                    <Mono color={T.text3} size={9} style={{ width: 48, flexShrink: 0 }}>COST</Mono>
                    <Mono color={T.yel} size={10}>{ev.price}</Mono>
                  </div>
                )}
                {ev.hours && (
                  <div style={{ display: "flex", gap: 10 }}>
                    <Mono color={T.text3} size={9} style={{ width: 48, flexShrink: 0 }}>HOURS</Mono>
                    <Mono color={T.text} size={10}>{ev.hours}</Mono>
                  </div>
                )}
                {ev.addr && (
                  <a
                    href={`https://maps.google.com/maps?q=${encodeURIComponent(ev.addr)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none" }}
                    onClick={e => e.stopPropagation()}
                  >
                    <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <Mono color={T.text3} size={9} style={{ width: 48, flexShrink: 0 }}>ADDR</Mono>
                      <span style={{ fontSize: 10, color: T.blu, fontFamily: T.sans, lineHeight: 1.5 }}>{ev.addr} ↗</span>
                    </div>
                  </a>
                )}
                {ev.tel && (
                  <a href={`tel:${ev.tel}`} style={{ textDecoration: "none" }} onClick={e => e.stopPropagation()}>
                    <div style={{ display: "flex", gap: 10 }}>
                      <Mono color={T.text3} size={9} style={{ width: 48, flexShrink: 0 }}>TEL</Mono>
                      <Mono color={T.blu} size={10}>{ev.tel}</Mono>
                    </div>
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Anim>
  );
}

function RentalCarCard({ car }) {
  const T = useT();
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(car.reservationNo);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <Anim>
      <div style={{
        border: `1px solid ${open ? T.bluBd : T.border}`,
        background: T.card,
        marginBottom: 8,
        overflow: "hidden",
        transition: "border-color .2s",
      }}>
        <button
          onClick={() => setOpen(!open)}
          style={{
            width: "100%", background: "none", border: "none",
            padding: "12px 14px", cursor: "pointer",
            display: "flex", alignItems: "center", gap: 12,
            fontFamily: T.sans, textAlign: "left",
          }}
        >
          <div style={{ width: 32, height: 32, background: T.bluBg, border: `1px solid ${T.bluBd}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ fontSize: 14 }}>🚗</span>
          </div>
          <div style={{ flex: 1 }}>
            <Mono color={T.blu} size={9} style={{ letterSpacing: "0.1em", display: "block", marginBottom: 3 }}>▸ VEHICLE_RENTAL</Mono>
            <div style={{ fontSize: 13, fontWeight: 600, color: T.text, fontFamily: T.sans }}>{car.company}</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
            <span
              onClick={handleCopy}
              style={{
                fontFamily: T.mono, fontSize: 9,
                color: copied ? T.yel : T.blu,
                border: `1px solid ${copied ? T.yelBd : T.bluBd}`,
                padding: "2px 6px", cursor: "pointer", transition: "all .2s",
              }}
            >
              {copied ? "✓ COPIED" : car.reservationNo}
            </span>
            <span style={{ fontSize: 10, color: T.text3, display: "inline-block", transition: "transform .3s", transform: open ? "rotate(180deg)" : "none" }}>▾</span>
          </div>
        </button>
        <div style={{
          maxHeight: open ? 1000 : 0, overflow: "hidden",
          opacity: open ? 1 : 0,
          transitionProperty: "max-height, opacity",
          transitionDuration: open ? ".45s, .3s" : ".3s, .15s",
        }}>
          <div style={{ borderTop: `1px solid ${T.border}`, padding: "12px 14px" }}>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
              <span style={{ fontFamily: T.mono, fontSize: 9, color: T.blu, border: `1px solid ${T.bluBd}`, padding: "2px 8px" }}>[ RESERVE_COMPLETE ]</span>
              <span style={{ fontFamily: T.mono, fontSize: 9, color: T.yel, border: `1px solid ${T.yelBd}`, padding: "2px 8px" }}>[ ANSHIN_ENROLLED ]</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
              {[
                ["PICKUP", `${car.pickup}\n${car.pickupNote}`],
                ["RETURN", car.dropoff],
                ["DRIVER", car.reservedBy],
                ["COST",   car.price],
              ].map(([label, value]) => (
                <div key={label} style={{ background: T.bg, border: `1px solid ${T.border}`, padding: "8px 10px" }}>
                  <Mono color={T.text3} size={9} style={{ display: "block", marginBottom: 4, letterSpacing: "0.06em" }}>{label}</Mono>
                  <Mono color={T.text} size={10} style={{ whiteSpace: "pre-line", lineHeight: 1.5 }}>{value}</Mono>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 6, background: T.bluBg, border: `1px solid ${T.bluBd}`, padding: "8px 10px" }}>
              <Mono color={T.text3} size={9} style={{ display: "block", marginBottom: 3, letterSpacing: "0.06em" }}>INSURANCE</Mono>
              <div style={{ fontSize: 11, color: T.blu, fontFamily: T.sans }}>{car.insurance}</div>
            </div>
            {car.addr && (
              <div style={{ marginTop: 6, background: T.bg, border: `1px solid ${T.border}`, padding: "8px 10px" }}>
                <Mono color={T.text3} size={9} style={{ display: "block", marginBottom: 3, letterSpacing: "0.06em" }}>LOCATION</Mono>
                <div style={{ fontSize: 11, color: T.text2, fontFamily: T.sans }}>{car.addr}</div>
              </div>
            )}
            <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 4 }}>
              {car.notes.map((note, i) => (
                <div key={i} style={{ fontSize: 11, color: T.text2, lineHeight: 1.7, background: T.redBg, border: `1px solid ${T.redBd}`, padding: "7px 10px", fontFamily: T.sans }}>
                  <Mono color={T.red} size={9}>! </Mono>{note}
                </div>
              ))}
            </div>
            <a href={`tel:${car.tel}`} style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              marginTop: 10, padding: "10px",
              background: T.bluBg, border: `1px solid ${T.bluBd}`,
              color: T.blu, textDecoration: "none",
              fontFamily: T.mono, fontSize: 11, letterSpacing: "0.05em",
            }}>
              ▶ CALL {car.tel}
            </a>
          </div>
        </div>
      </div>
    </Anim>
  );
}

function WarningsCard({ groups }) {
  const T = useT();
  const [open, setOpen] = useState(false);
  const total = groups.reduce((s, g) => s + g.items.length, 0);
  return (
    <Anim>
      <div style={{
        border: `1px solid ${open ? T.redBd : T.border}`,
        background: T.card,
        marginTop: 10,
        overflow: "hidden",
        transition: "border-color .2s",
      }}>
        <button onClick={() => setOpen(!open)} style={{
          width: "100%", background: "none", border: "none",
          padding: "12px 14px", cursor: "pointer",
          display: "flex", alignItems: "center", gap: 10,
          fontFamily: T.sans, textAlign: "left",
        }}>
          <div style={{ width: 28, height: 28, background: T.redBg, border: `1px solid ${T.redBd}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Mono color={T.red} size={11} style={{ fontWeight: 700 }}>!</Mono>
          </div>
          <div style={{ flex: 1 }}>
            <Mono color={T.red} size={9} style={{ display: "block", letterSpacing: "0.1em", marginBottom: 2 }}>! WARNINGS</Mono>
            <div style={{ fontSize: 12, color: T.text, fontFamily: T.sans }}>注意事項・コース情報</div>
          </div>
          <Mono color={T.text3} size={10}>{total}件</Mono>
          <span style={{ fontSize: 10, color: T.text3, display: "inline-block", transition: "transform .3s", transform: open ? "rotate(180deg)" : "none" }}>▾</span>
        </button>
        <div style={{
          maxHeight: open ? 2000 : 0, overflow: "hidden",
          opacity: open ? 1 : 0,
          transitionProperty: "max-height, opacity",
          transitionDuration: open ? ".45s, .3s" : ".3s, .15s",
        }}>
          <div style={{ borderTop: `1px solid ${T.border}`, padding: "12px 14px", display: "flex", flexDirection: "column", gap: 10 }}>
            {groups.map((group, gi) => {
              const gc = group.accent === "#d4553a" ? T.red : group.accent === "#5ba4c9" ? T.blu : T.text2;
              return (
                <div key={gi}>
                  {gi > 0 && <div style={{ height: 1, background: T.border, marginBottom: 10 }} />}
                  <Mono color={gc} size={9} style={{ display: "block", letterSpacing: "0.08em", marginBottom: 6 }}>▸ {group.title.toUpperCase()}</Mono>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    {group.items.map((item, ii) => (
                      <div key={ii} style={{ display: "flex", gap: 8, alignItems: "flex-start", background: T.bg, border: `1px solid ${T.border}`, padding: "7px 10px" }}>
                        <Mono color={T.text3} size={9} style={{ flexShrink: 0, marginTop: 2 }}>▸</Mono>
                        <span style={{ fontSize: 11, color: T.text2, lineHeight: 1.7, flex: 1, fontFamily: T.sans }}>
                          {item.text}
                          {item.url && (
                            <a href={item.url} target="_blank" rel="noopener noreferrer"
                              style={{ marginLeft: 4, color: T.blu, fontWeight: 600, textDecoration: "none" }}
                              onClick={e => e.stopPropagation()}
                            >
                              {item.urlLabel} ↗
                            </a>
                          )}
                          {item.tel && (
                            <a href={`tel:${item.tel}`}
                              style={{ marginLeft: 4, color: T.blu, fontFamily: T.mono, fontSize: 10, textDecoration: "none" }}
                              onClick={e => e.stopPropagation()}
                            >
                              {item.telLabel}
                            </a>
                          )}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Anim>
  );
}

function BikeRentalCard({ rental }) {
  const T = useT();
  const [open, setOpen] = useState(false);
  return (
    <Anim>
      <div style={{
        border: `1px solid ${open ? T.yelBd : T.border}`,
        background: T.card,
        marginBottom: 8,
        overflow: "hidden",
        transition: "border-color .2s",
      }}>
        <button
          onClick={() => setOpen(!open)}
          style={{ width: "100%", background: "none", border: "none", padding: "12px 14px", cursor: "pointer", display: "flex", alignItems: "center", gap: 12, fontFamily: T.sans, textAlign: "left" }}
        >
          <div style={{ width: 32, height: 32, background: T.yelBg, border: `1px solid ${T.yelBd}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ fontSize: 14 }}>🏍</span>
          </div>
          <div style={{ flex: 1 }}>
            <Mono color={T.yel} size={9} style={{ display: "block", letterSpacing: "0.1em", marginBottom: 3 }}>▸ MOTO_RENTAL</Mono>
            <div style={{ fontSize: 13, fontWeight: 600, color: T.text, fontFamily: T.sans }}>{rental.shop}</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
            <span style={{ fontFamily: T.mono, fontSize: 9, color: T.yel, border: `1px solid ${T.yelBd}`, padding: "2px 6px" }}>
              {rental.start}〜{rental.end}
            </span>
            <span style={{ fontSize: 10, color: T.text3, display: "inline-block", transition: "transform .3s", transform: open ? "rotate(180deg)" : "none" }}>▾</span>
          </div>
        </button>
        <div style={{
          maxHeight: open ? 800 : 0, overflow: "hidden",
          opacity: open ? 1 : 0,
          transitionProperty: "max-height, opacity",
          transitionDuration: open ? ".45s, .3s" : ".3s, .15s",
        }}>
          <div style={{ borderTop: `1px solid ${T.border}`, padding: "12px 14px" }}>
            <Mono color={T.text3} size={9} style={{ display: "block", letterSpacing: "0.06em", marginBottom: 6 }}>RIDER_ASSIGNMENT</Mono>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {rental.bikes.map((b, i) => (
                <div key={i} style={{ background: T.bg, border: `1px solid ${T.border}`, padding: "8px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontFamily: T.mono, fontSize: 9, color: T.yel, border: `1px solid ${T.yelBd}`, padding: "1px 6px" }}>{b.rider}</span>
                  <span style={{ fontFamily: T.mono, fontSize: 11, fontWeight: 700, color: T.text }}>{b.model}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 6, background: T.bg, border: `1px solid ${T.border}`, padding: "8px 10px" }}>
              <Mono color={T.text3} size={9} style={{ display: "block", letterSpacing: "0.06em", marginBottom: 3 }}>HELMET</Mono>
              <div style={{ fontSize: 11, color: T.text2, fontFamily: T.sans }}>{rental.helmet}</div>
            </div>
            <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 4 }}>
              {rental.notes.map((note, i) => (
                <div key={i} style={{ fontSize: 11, color: T.text2, lineHeight: 1.7, background: T.redBg, border: `1px solid ${T.redBd}`, padding: "7px 10px", fontFamily: T.sans }}>
                  <Mono color={T.red} size={9}>! </Mono>{note}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Anim>
  );
}

function FlightsCard({ flights }) {
  const T = useT();
  const [open, setOpen] = useState(false);
  const summary = [
    flights.outbound && flights.outbound.flight,
    flights.returns  && `RET×${flights.returns.length}`,
  ].filter(Boolean).join(" / ");
  return (
    <Anim>
      <div style={{
        border: `1px solid ${open ? T.bluBd : T.border}`,
        background: T.card,
        marginBottom: 8,
        overflow: "hidden",
        transition: "border-color .2s",
      }}>
        <button
          onClick={() => setOpen(!open)}
          style={{
            width: "100%", background: "none", border: "none",
            padding: "12px 14px", cursor: "pointer",
            display: "flex", alignItems: "center", gap: 12,
            fontFamily: T.sans, textAlign: "left",
          }}
        >
          <div style={{ width: 32, height: 32, background: T.bluBg, border: `1px solid ${T.bluBd}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ fontSize: 14 }}>✈</span>
          </div>
          <div style={{ flex: 1 }}>
            <Mono color={T.blu} size={9} style={{ display: "block", letterSpacing: "0.1em", marginBottom: 3 }}>▸ FLIGHT_INFO</Mono>
            <span style={{ fontFamily: T.mono, fontSize: 12, fontWeight: 700, color: T.text }}>{summary}</span>
          </div>
          <span style={{ fontSize: 10, color: T.text3, display: "inline-block", transition: "transform .3s", transform: open ? "rotate(180deg)" : "none" }}>▾</span>
        </button>
        <div style={{
          maxHeight: open ? 1000 : 0, overflow: "hidden",
          opacity: open ? 1 : 0,
          transitionProperty: "max-height, opacity",
          transitionDuration: open ? ".45s, .3s" : ".3s, .15s",
        }}>
          <div style={{ borderTop: `1px solid ${T.border}`, padding: "12px 14px" }}>
            {flights.outbound && (
              <div style={{ marginBottom: 12 }}>
                <Mono color={T.blu} size={9} style={{ display: "block", letterSpacing: "0.08em", marginBottom: 6 }}>
                  ▶ OUTBOUND · {flights.outbound.date} · {flights.outbound.note}
                </Mono>
                <div style={{ background: T.bg, border: `1px solid ${T.bluBd}`, padding: "10px 12px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontFamily: T.mono, fontSize: 14, fontWeight: 700, color: T.yel }}>{flights.outbound.flight}</span>
                    <span style={{ fontFamily: T.mono, fontSize: 11, color: T.blu }}>{flights.outbound.departure}</span>
                  </div>
                  <div style={{ fontFamily: T.mono, fontSize: 10, color: T.text2, marginTop: 4 }}>{flights.outbound.route}</div>
                </div>
              </div>
            )}
            {flights.returns && (
              <div>
                <Mono color={T.blu} size={9} style={{ display: "block", letterSpacing: "0.08em", marginBottom: 6 }}>
                  ◀ RETURN · 4/30(木) · 新千歳解散
                </Mono>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {flights.returns.map((r, i) => (
                    <div key={i} style={{ background: T.bg, border: `1px solid ${T.bluBd}`, padding: "10px 12px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                        <span style={{ fontFamily: T.mono, fontSize: 9, color: T.blu, border: `1px solid ${T.bluBd}`, padding: "1px 6px" }}>{r.name}</span>
                        <span style={{ fontFamily: T.mono, fontSize: 13, fontWeight: 700, color: T.yel }}>{r.flight}</span>
                        <span style={{ fontFamily: T.mono, fontSize: 11, color: T.blu }}>{r.departure}</span>
                      </div>
                      <div style={{ fontFamily: T.mono, fontSize: 10, color: T.text2, marginTop: 4 }}>{r.route}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Anim>
  );
}

function SimpleAlertsCard({ warnings }) {
  const T = useT();
  const [open, setOpen] = useState(false);
  return (
    <Anim>
      <div style={{
        border: `1px solid ${open ? T.redBd : T.border}`,
        background: T.card,
        marginTop: 10,
        overflow: "hidden",
        transition: "border-color .2s",
      }}>
        <button onClick={() => setOpen(!open)} style={{
          width: "100%", background: "none", border: "none",
          padding: "12px 14px", cursor: "pointer",
          display: "flex", alignItems: "center", gap: 10,
          fontFamily: T.sans, textAlign: "left",
        }}>
          <div style={{ width: 28, height: 28, background: T.redBg, border: `1px solid ${T.redBd}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Mono color={T.red} size={11} style={{ fontWeight: 700 }}>!</Mono>
          </div>
          <div style={{ flex: 1 }}>
            <Mono color={T.red} size={9} style={{ display: "block", letterSpacing: "0.1em", marginBottom: 2 }}>! ALERTS</Mono>
            <div style={{ fontSize: 12, color: T.text, fontFamily: T.sans }}>注意事項</div>
          </div>
          <Mono color={T.text3} size={10}>{warnings.length}件</Mono>
          <span style={{ fontSize: 10, color: T.text3, display: "inline-block", transition: "transform .3s", transform: open ? "rotate(180deg)" : "none" }}>▾</span>
        </button>
        <div style={{
          maxHeight: open ? 1000 : 0, overflow: "hidden",
          opacity: open ? 1 : 0,
          transitionProperty: "max-height, opacity",
          transitionDuration: open ? ".4s, .3s" : ".25s, .15s",
        }}>
          <div style={{ borderTop: `1px solid ${T.border}`, padding: "10px 14px", display: "flex", flexDirection: "column", gap: 4 }}>
            {warnings.map((w, i) => (
              <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start", background: T.bg, border: `1px solid ${T.border}`, padding: "7px 10px" }}>
                <Mono color={T.text3} size={9} style={{ flexShrink: 0, marginTop: 2 }}>▸</Mono>
                <span style={{ fontSize: 11, color: T.text2, lineHeight: 1.7, flex: 1, fontFamily: T.sans }}>{w}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Anim>
  );
}

function DayView({ day }) {
  const T = useT();
  const [showG, setShowG] = useState(false);
  return (
    <div style={{ paddingBottom: 24 }}>
      {day.stay && (
        <Anim>
          <div style={{
            background: T.card,
            border: `1px solid ${T.bluBd}`,
            padding: "12px 14px",
            marginBottom: 8,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 32, height: 32, background: T.bluBg, border: `1px solid ${T.bluBd}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ fontSize: 14 }}>🏨</span>
              </div>
              <div style={{ flex: 1 }}>
                <Mono color={T.blu} size={9} style={{ display: "block", letterSpacing: "0.1em", marginBottom: 3 }}>▸ QUARTERS</Mono>
                <div style={{ fontSize: 13, fontWeight: 600, color: T.text, fontFamily: T.sans }}>{day.stay}</div>
              </div>
            </div>
            <div style={{ marginTop: 8, display: "flex", gap: 6, flexWrap: "wrap" }}>
              <span style={{ fontFamily: T.mono, fontSize: 9, color: T.blu, border: `1px solid ${T.bluBd}`, padding: "2px 6px" }}>[ RESERVE_COMPLETE ]</span>
              {day.stayPrice && (
                <span style={{ fontFamily: T.mono, fontSize: 9, color: T.yel, border: `1px solid ${T.yelBd}`, padding: "2px 6px" }}>
                  {day.stayPrice.split("（")[0]}
                </span>
              )}
            </div>
            {day.stayNote && (
              <div style={{ fontSize: 11, color: T.text2, marginTop: 8, lineHeight: 1.7, paddingTop: 8, borderTop: `1px solid ${T.border}`, fontFamily: T.sans }}>
                {day.stayNote}
              </div>
            )}
          </div>
        </Anim>
      )}

      {day.rentalCar && <RentalCarCard car={day.rentalCar} />}
      {day.bikeRental && <BikeRentalCard rental={day.bikeRental} />}
      {day.flights && <FlightsCard flights={day.flights} />}

      {day.highlight && (
        <Anim>
          <div style={{
            background: T.yelBg,
            border: `1px solid ${T.yelBd}`,
            borderLeft: `3px solid ${T.yel}`,
            padding: "12px 14px",
            marginBottom: 10,
          }}>
            <Mono color={T.yel} size={9} style={{ display: "block", letterSpacing: "0.1em", marginBottom: 6 }}>◆ MISSION_BRIEF</Mono>
            <div style={{ fontSize: 12, lineHeight: 1.8, color: T.text, fontFamily: T.sans }}>{day.highlight}</div>
          </div>
        </Anim>
      )}

      {day.trek && (
        <Anim delay={0.05}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 4, marginBottom: 10 }}>
            {[
              ["DIST", day.trek.distance],
              ["TIME", day.trek.time],
              ["LEVEL", day.trek.level],
              ["ELEV", day.trek.elevation],
            ].map(([l, v]) => (
              <div key={l} style={{ background: T.card, border: `1px solid ${T.border}`, padding: "8px 4px", textAlign: "center" }}>
                <div style={{ fontFamily: T.mono, fontSize: 10, fontWeight: 700, color: T.yel, lineHeight: 1.3 }}>{v}</div>
                <div style={{ fontFamily: T.mono, fontSize: 8, color: T.text3, marginTop: 3, letterSpacing: "0.05em" }}>{l}</div>
              </div>
            ))}
          </div>
        </Anim>
      )}

      <Anim delay={0.06}>
        <div style={{ overflow: "hidden", border: `1px solid ${T.border}`, height: 160, marginBottom: 10 }}>
          <iframe
            title="map"
            src={`https://maps.google.com/maps?q=${encodeURIComponent(day.mapQuery)}&z=7&output=embed&hl=ja`}
            style={{ width: "100%", height: "100%", border: "none", filter: "invert(0.92) hue-rotate(180deg) saturate(0.7) brightness(0.85)" }}
            loading="lazy"
          />
        </div>
      </Anim>

      <div style={{ position: "relative", paddingLeft: 16 }}>
        <div style={{ position: "absolute", left: 2, top: 0, bottom: 0, width: 1, background: `linear-gradient(to bottom, ${T.yel}55, transparent)` }} />
        {day.events.map((ev, i) => (
          <div key={i} style={{ position: "relative", marginBottom: 2 }}>
            <div style={{
              position: "absolute",
              left: -16,
              top: 16,
              width: ev.important ? 7 : 5,
              height: ev.important ? 7 : 5,
              background: ev.important ? T.red : T.yel,
              transform: "rotate(45deg)",
            }} />
            <EventCard ev={ev} idx={i} />
          </div>
        ))}
      </div>

      {day.warningGroups && <WarningsCard groups={day.warningGroups} />}

      {!day.warningGroups && day.warnings?.length > 0 && (
        <SimpleAlertsCard warnings={day.warnings} />
      )}

      {day.gourmet?.length > 0 && (
        <Anim>
          <div style={{ marginTop: 12 }}>
            <button
              onClick={() => setShowG(!showG)}
              style={{
                width: "100%", background: T.card, border: `1px solid ${T.yelBd}`,
                padding: "10px 14px", cursor: "pointer",
                display: "flex", justifyContent: "space-between", alignItems: "center",
                fontFamily: T.mono, color: T.yel, fontSize: 10, letterSpacing: "0.08em",
              }}
            >
              <span>▸ PROVISIONS_DB ({day.gourmet.length})</span>
              <span style={{ transform: showG ? "rotate(180deg)" : "none", transition: ".3s" }}>▾</span>
            </button>
            <div style={{ maxHeight: showG ? 2000 : 0, overflow: "hidden", transition: "max-height .5s" }}>
              {day.gourmet.map((g, i) => (
                <div key={i} style={{ background: T.card, border: `1px solid ${T.border}`, borderTop: "none", padding: "10px 14px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: T.yel, fontFamily: T.sans }}>{g.name}</span>
                    {g.tel && (
                      <a href={`tel:${g.tel}`} style={{ fontFamily: T.mono, fontSize: 9, color: T.blu, textDecoration: "none", border: `1px solid ${T.bluBd}`, padding: "2px 6px" }}>
                        CALL
                      </a>
                    )}
                  </div>
                  <p style={{ fontSize: 11, color: T.text2, marginTop: 4, lineHeight: 1.6, fontFamily: T.sans }}>{g.note}</p>
                  {g.tags && (
                    <div style={{ display: "flex", gap: 4, marginTop: 4, flexWrap: "wrap" }}>
                      {g.tags.map(t => <Badge key={t} color={T.yel}>{t}</Badge>)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Anim>
      )}
    </div>
  );
}

function ChecklistView() {
  const T = useT();
  const [ck, setCk] = useState(() => {
    try { return JSON.parse(localStorage.getItem("hk_cl") || "{}"); }
    catch { return {}; }
  });
  const [openCats, setOpenCats] = useState(() => new Set(CHECKLIST.map((_, i) => i)));
  const toggle = (k) => {
    const n = { ...ck, [k]: !ck[k] };
    setCk(n);
    try { localStorage.setItem("hk_cl", JSON.stringify(n)); } catch {}
  };
  const toggleCat = (ci) => setOpenCats(s => {
    const n = new Set(s);
    n.has(ci) ? n.delete(ci) : n.add(ci);
    return n;
  });
  const total = CHECKLIST.reduce((a, c) => a + c.items.length, 0);
  const done = Object.values(ck).filter(Boolean).length;
  return (
    <div style={{ padding: "0 16px 24px" }}>
      <Anim>
        <div style={{ background: T.card, border: `1px solid ${T.border}`, padding: "12px 14px", marginBottom: 12, display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontFamily: T.mono, fontSize: 13, color: done === total ? T.yel : T.blu, fontWeight: 700, minWidth: 48 }}>
            {String(done).padStart(2,"0")}/{String(total).padStart(2,"0")}
          </span>
          <div style={{ flex: 1, height: 2, background: T.border, position: "relative" }}>
            <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: `${(done / total) * 100}%`, background: done === total ? T.yel : T.blu, transition: "width .4s" }} />
          </div>
          {done === total && (
            <span style={{ fontFamily: T.mono, fontSize: 9, color: T.yel, border: `1px solid ${T.yelBd}`, padding: "2px 6px" }}>[ CARGO_READY ]</span>
          )}
        </div>
      </Anim>
      {CHECKLIST.map((cat, ci) => {
        const catOpen = openCats.has(ci);
        const catDone = cat.items.filter((_, ii) => ck[`${ci}-${ii}`]).length;
        return (
          <Anim key={ci} delay={ci * 0.04}>
            <div style={{ marginBottom: 6 }}>
              <button
                onClick={() => toggleCat(ci)}
                style={{
                  width: "100%", background: T.card, border: `1px solid ${catOpen ? T.bluBd : T.border}`,
                  padding: "10px 14px", cursor: "pointer",
                  display: "flex", alignItems: "center", gap: 10,
                  fontFamily: T.mono, textAlign: "left", marginBottom: 0,
                  transition: "border-color .2s",
                }}
              >
                <div style={{ flex: 1 }}>
                  <span style={{ fontFamily: T.mono, fontSize: 9, color: catOpen ? T.blu : T.text2, letterSpacing: "0.08em" }}>
                    ▸ {cat.cat.replace(/^\S+\s/, "").toUpperCase()}
                  </span>
                </div>
                <span style={{ fontFamily: T.mono, fontSize: 9, color: catDone === cat.items.length ? T.yel : T.text3 }}>
                  {catDone}/{cat.items.length}
                </span>
                <span style={{ fontSize: 10, color: T.text3, display: "inline-block", transition: "transform .3s", transform: catOpen ? "rotate(180deg)" : "none" }}>▾</span>
              </button>
              <div style={{
                maxHeight: catOpen ? 2000 : 0, overflow: "hidden",
                opacity: catOpen ? 1 : 0,
                transitionProperty: "max-height, opacity",
                transitionDuration: catOpen ? ".45s, .3s" : ".3s, .15s",
              }}>
                <div style={{ padding: "4px 0 8px" }}>
                  {cat.items.map((item, ii) => {
                    const k = `${ci}-${ii}`;
                    const d = ck[k];
                    return (
                      <div
                        key={k}
                        onClick={() => toggle(k)}
                        style={{
                          background: d ? T.bluBg : T.card,
                          opacity: d ? 0.5 : 1,
                          border: `1px solid ${d ? T.bluBd : T.border}`,
                          borderTop: "none",
                          padding: "10px 12px",
                          marginBottom: 0,
                          display: "flex", gap: 10, alignItems: "flex-start",
                          cursor: "pointer",
                          transition: "all .2s",
                        }}
                      >
                        <div style={{
                          width: 18, height: 18,
                          border: `1px solid ${d ? T.blu : T.text3}`,
                          background: d ? T.blu : "transparent",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          flexShrink: 0, transition: ".2s", marginTop: 1,
                        }}>
                          {d && <span style={{ color: T.bg, fontSize: 10, fontWeight: 700, fontFamily: T.mono }}>✓</span>}
                        </div>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 600, color: T.text, fontFamily: T.sans }}>{item.name}</div>
                          <div style={{ fontSize: 11, color: T.text2, marginTop: 2, lineHeight: 1.6, fontFamily: T.sans }}>{item.sub}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </Anim>
        );
      })}
    </div>
  );
}

/* ── App ── */
export default function App() {
  const [tab, setTab] = useState("day");
  const [ad, setAd] = useState(0);
  const [isDark, setIsDark] = useState(() => {
    try { return localStorage.getItem("hk_theme") !== "warm"; }
    catch { return true; }
  });
  const T = isDark ? THEMES.ds2 : THEMES.warm;
  const toggleTheme = () => setIsDark(d => {
    const next = !d;
    try { localStorage.setItem("hk_theme", next ? "ds2" : "warm"); } catch {}
    return next;
  });
  const touchStartX = useRef(null);
  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(dx) < 50) return;
    if (dx < 0) setAd(i => Math.min(i + 1, DAYS.length - 1));
    else setAd(i => Math.max(i - 1, 0));
  };
  return (
    <ThemeContext.Provider value={T}>
    <div style={{ fontFamily: T.sans, background: T.bg, minHeight: "100vh", maxWidth: 480, margin: "0 auto", color: T.text }}>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Mono:wght@400;700&family=Zen+Maru+Gothic:wght@400;500;700&family=Kaisei+Decol:wght@400;700&family=M+PLUS+Rounded+1c:wght@400;500;700&display=swap"
        rel="stylesheet"
      />
      <style>{`
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
        *{-webkit-tap-highlight-color:rgba(96,165,250,0.08)}
        a,button{touch-action:manipulation}
        ::-webkit-scrollbar{width:2px;height:2px}
        ::-webkit-scrollbar-track{background:transparent}
        ::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.08)}
      `}</style>

      {/* ─── HEADER ─── */}
      {isDark ? (
        /* DS2 header */
        <div style={{ background: "#050507", borderBottom: `1px solid ${T.border}`, padding: "36px 20px 24px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 14, left: 14, width: 18, height: 18, borderTop: `1px solid ${T.blu}55`, borderLeft: `1px solid ${T.blu}55` }} />
          <div style={{ position: "absolute", top: 14, right: 14, width: 18, height: 18, borderTop: `1px solid ${T.blu}55`, borderRight: `1px solid ${T.blu}55` }} />
          <div style={{ position: "absolute", bottom: 24, left: 14, width: 18, height: 18, borderBottom: `1px solid ${T.blu}55`, borderLeft: `1px solid ${T.blu}55` }} />
          <div style={{ position: "absolute", bottom: 24, right: 14, width: 18, height: 18, borderBottom: `1px solid ${T.blu}55`, borderRight: `1px solid ${T.blu}55` }} />
          <div style={{ textAlign: "center" }}>
            <div style={{ fontFamily: T.mono, fontSize: 28, fontWeight: 700, color: T.blu, letterSpacing: "0.08em", lineHeight: 1 }}>
              HOKKAIDO EXPEDITION
            </div>
            <div style={{ height: 1, background: T.border, margin: "14px 0" }} />
            <Mono color={T.text2} size={9} style={{ display: "block", letterSpacing: "0.14em", marginBottom: 14 }}>2026.04.24 — 04.30</Mono>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 6 }}>
              {[["07","DAYS"],["1540km","DRIVE"],["12.4km","TREK"],["∞","FOOD"]].map(([n, l]) => (
                <div key={l} style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${T.border}`, padding: "8px 4px", textAlign: "center" }}>
                  <div style={{ fontFamily: T.mono, fontSize: 13, fontWeight: 700, color: T.text }}>{n}</div>
                  <div style={{ fontFamily: T.mono, fontSize: 7, color: T.text3, letterSpacing: "0.1em", marginTop: 2 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Warm header */
        <div style={{ background: "linear-gradient(175deg,#0f2419 0%,#1a3a2a 40%,#2a5a3e 70%,#3d7a5a 100%)", padding: "48px 24px 32px", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 36, background: T.bg, clipPath: "polygon(0 60%,30% 30%,55% 50%,80% 20%,100% 45%,100% 100%,0 100%)" }} />
          <div style={{ fontSize: 10, letterSpacing: 4, color: "#a8d8ea", marginBottom: 12, fontFamily: T.sans }}>2026.04.24 — 04.30</div>
          <div style={{ fontFamily: "'Kaisei Decol',serif", fontSize: 40, fontWeight: 700, color: "#fff", lineHeight: 1.1, textShadow: "0 4px 24px rgba(0,0,0,.3)" }}>北の大地</div>
          <div style={{ fontFamily: "'Kaisei Decol',serif", fontSize: 13, color: "#a8d8ea", marginTop: 6 }}>歩く・走る・食う — 6泊7日</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 8, marginTop: 20 }}>
            {[["7","DAYS"],["1,540km","DRIVE"],["12.4km","TREK"],["∞","FOOD"]].map(([n, l]) => (
              <div key={l} style={{ background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.12)", borderRadius: 10, padding: "8px 4px", textAlign: "center" }}>
                <div style={{ fontFamily: T.mono, fontSize: 14, fontWeight: 700, color: "#fff" }}>{n}</div>
                <div style={{ fontSize: 8, color: "#a8d8ea", letterSpacing: 2, marginTop: 2, fontFamily: T.sans }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─── TAB BAR ─── */}
      <div style={{ display: "flex", background: T.card, borderBottom: `1px solid ${T.border}`, position: "sticky", top: 0, zIndex: 100 }}>
        {[
          ["day",   isDark ? "ITINERARY" : "📋 行程"],
          ["check", isDark ? "CARGO"     : "✅ 持ち物"],
          ["tips",  isDark ? "ALERTS"    : "⚠ 注意"],
        ].map(([id, lb]) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            style={{
              flex: 1, padding: "11px 0",
              border: "none", background: "none",
              fontFamily: T.mono, fontSize: isDark ? 9 : 11, letterSpacing: isDark ? "0.12em" : 0, fontWeight: 700,
              color: tab === id ? T.yel : T.text3,
              borderBottom: tab === id ? `2px solid ${T.yel}` : "2px solid transparent",
              cursor: "pointer", transition: ".2s",
            }}
          >
            {lb}
          </button>
        ))}
        {/* ─── THEME TOGGLE ─── */}
        <button
          onClick={toggleTheme}
          title={isDark ? "ウォームテーマに切り替え" : "DS2テーマに切り替え"}
          style={{
            padding: "0 12px",
            border: "none", background: "none",
            borderLeft: `1px solid ${T.border}`,
            borderBottom: "2px solid transparent",
            color: T.text2, cursor: "pointer",
            fontSize: 14, lineHeight: 1,
            flexShrink: 0,
          }}
        >
          {isDark ? "☀" : "◐"}
        </button>
      </div>

      {/* ─── ITINERARY TAB ─── */}
      {tab === "day" && (
        <>
          <div style={{ display: "flex", gap: 4, padding: "10px 16px", overflowX: "auto", WebkitOverflowScrolling: "touch", position: "sticky", top: 40, zIndex: 99, background: T.bg, borderBottom: `1px solid ${T.border}` }}>
            {DAYS.map((d, i) => (
              <button
                key={d.id}
                onClick={() => setAd(i)}
                style={{
                  flexShrink: 0,
                  border: `1px solid ${ad === i ? T.yel : T.border}`,
                  background: ad === i ? T.yelBg : "transparent",
                  color: ad === i ? T.yel : T.text3,
                  padding: "5px 12px",
                  fontFamily: T.mono, fontSize: 10, fontWeight: 700,
                  cursor: "pointer", transition: "all .2s",
                  whiteSpace: "nowrap", letterSpacing: "0.05em",
                }}
              >
                D{d.id}{[3,5,6].includes(d.id) ? "★" : ""}
              </button>
            ))}
          </div>
          {(() => {
            const d = DAYS[ad];
            return (
              <div
                key={d.id}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                <div style={{ padding: "14px 16px 12px", borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{
                    width: 44, height: 44,
                    border: `1px solid ${T.yelBd}`,
                    background: T.yelBg,
                    display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    <span style={{ fontFamily: T.mono, fontSize: 18, fontWeight: 700, color: T.yel, lineHeight: 1 }}>{String(d.id).padStart(2,"0")}</span>
                    <span style={{ fontFamily: T.mono, fontSize: 7, color: T.text3, letterSpacing: "0.1em" }}>DAY</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 17, fontWeight: 700, color: T.text, fontFamily: T.sans, lineHeight: 1.3 }}>{d.title}</div>
                    <Mono color={T.text2} size={10} style={{ display: "block", marginTop: 2 }}>
                      {d.date}{d.km > 0 ? ` · ${d.km}km` : ""}
                    </Mono>
                    <Mono color={T.text3} size={9}>{d.subtitle}</Mono>
                  </div>
                  <div style={{ display: "flex", gap: 4, flexShrink: 0 }}>
                    <button
                      onClick={() => setAd(i => Math.max(i - 1, 0))}
                      disabled={ad === 0}
                      style={{ background: "none", border: `1px solid ${ad === 0 ? T.text3 : T.border}`, color: ad === 0 ? T.text3 : T.text2, padding: "4px 8px", fontFamily: T.mono, fontSize: 11, cursor: ad === 0 ? "default" : "pointer" }}
                    >◀</button>
                    <button
                      onClick={() => setAd(i => Math.min(i + 1, DAYS.length - 1))}
                      disabled={ad === DAYS.length - 1}
                      style={{ background: "none", border: `1px solid ${ad === DAYS.length - 1 ? T.text3 : T.border}`, color: ad === DAYS.length - 1 ? T.text3 : T.text2, padding: "4px 8px", fontFamily: T.mono, fontSize: 11, cursor: ad === DAYS.length - 1 ? "default" : "pointer" }}
                    >▶</button>
                  </div>
                </div>
                <div style={{ padding: "10px 16px 0" }}>
                  <DayView day={d} />
                </div>
              </div>
            );
          })()}
        </>
      )}

      {/* ─── CARGO TAB ─── */}
      {tab === "check" && (
        <div style={{ paddingTop: 16 }}>
          <div style={{ padding: "0 16px 12px" }}>
            <Mono color={T.text3} size={9} style={{ display: "block", letterSpacing: "0.12em", marginBottom: 4 }}>▸ CARGO_MANIFEST</Mono>
            <div style={{ fontSize: 17, fontWeight: 700, color: T.text, fontFamily: T.sans }}>持ち物チェックリスト</div>
            <Mono color={T.text3} size={9} style={{ display: "block", marginTop: 4 }}>TAP_TO_MARK_COMPLETE</Mono>
          </div>
          <div style={{ height: 1, background: T.border, marginBottom: 16 }} />
          <ChecklistView />
        </div>
      )}

      {/* ─── ALERTS TAB ─── */}
      {tab === "tips" && (
        <div style={{ paddingTop: 16 }}>
          <div style={{ padding: "0 16px 12px" }}>
            <Mono color={T.red} size={9} style={{ display: "block", letterSpacing: "0.12em", marginBottom: 4 }}>! CRITICAL_ALERTS</Mono>
            <div style={{ fontSize: 17, fontWeight: 700, color: T.text, fontFamily: T.sans }}>北海道ドライブの注意点</div>
            <Mono color={T.red} size={9} style={{ display: "block", marginTop: 4 }}>READ_BEFORE_DEPARTURE</Mono>
          </div>
          <div style={{ height: 1, background: T.border, marginBottom: 8 }} />
          <div style={{ padding: "0 16px 24px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {TIPS.map((t, i) => (
                <Anim key={i} delay={i * 0.04}>
                  <div style={{ background: T.card, border: `1px solid ${T.border}`, borderLeft: `2px solid ${T.red}`, padding: "12px 14px" }}>
                    <div style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 700, color: T.text, marginBottom: 4 }}>
                      {t.icon} {t.title}
                    </div>
                    <div style={{ fontSize: 12, color: T.text2, lineHeight: 1.7, fontFamily: T.sans }}>{t.text}</div>
                  </div>
                </Anim>
              ))}
            </div>
            <Anim delay={0.3}>
              <div style={{ background: T.card, border: `1px solid ${T.redBd}`, padding: "14px", marginTop: 10 }}>
                <Mono color={T.red} size={9} style={{ display: "block", letterSpacing: "0.1em", marginBottom: 10 }}>! EMERGENCY_CONTACTS</Mono>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                  {EMER.map((e) => (
                    <a key={e.l} href={`tel:${e.v}`} style={{ textDecoration: "none" }}>
                      <div style={{ background: T.bg, border: `1px solid ${T.border}`, padding: "8px 10px" }}>
                        <Mono color={T.text3} size={8} style={{ display: "block", marginBottom: 2 }}>{e.l}</Mono>
                        <Mono color={T.red} size={13} style={{ fontWeight: 700 }}>{e.v}</Mono>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </Anim>
          </div>
        </div>
      )}

      {/* ─── FOOTER ─── */}
      <div style={{ textAlign: "center", padding: "24px 16px", borderTop: `1px solid ${T.border}` }}>
        <Mono color={T.text3} size={8} style={{ display: "block", letterSpacing: "0.15em", marginBottom: 6 }}>ROUTE_LOG</Mono>
        <Mono color={T.text2} size={9}>CTS→WKJ→REB→KBQ→SHB→KUH→OBO→CTS</Mono>
        <Mono color={T.text3} size={8} style={{ display: "block", marginTop: 6, letterSpacing: "0.1em" }}>[ TERMINAL_EOF ]</Mono>
      </div>
    </div>
    </ThemeContext.Provider>
  );
}


