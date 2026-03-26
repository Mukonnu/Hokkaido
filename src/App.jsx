import { useEffect, useRef, useState } from "react";

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
    subtitle: "★トレッキング",
    km: 0,
    color: "#9b7ec8",
    stay: "ドーミーイン稚内（連泊）",
    stayIcon: "🏨",
    stayPrice: "¥16,560（1人¥8,280）",
    stayNote: "最大の戦略。翌朝は荷物をすべて部屋に置いて「完全な手ぶら状態」で礼文島へ突撃。フェリー乗り場激近のベースキャンプ。",
    highlight:
      '最北の離島「礼文島」。12.4kmの岬めぐりコース。右に青い海、正面に利尻富士。花の浮島を歩く。',
    mapQuery: "稚内港+礼文島+スコトン岬+澄海岬",
    trek: { distance: "12.4km", time: "約5h20m", level: "★★ 中級", elevation: "180m" },
    events: [
      {
        time: "05:30",
        title: "稚内港集合",
        type: "move",
        important: true,
        desc: "ドーミーインから港まで車5分。連泊なのでトレッキング装備だけ持って出発。6:00乗船手続き開始。2等自由席 片道¥3,950。船内で朝食を済ませておくと◎。\n\n⚠ 前日夜にフェリー運航確認（heartlandferry.jp）。強風で欠航リスクあり。",
      },
      {
        time: "09:00",
        title: "🥾 トレッキング開始",
        type: "spot",
        tags: ["トレッキング"],
        important: true,
        desc: "バスでスコトン岬へ。\n\nスコトン岬→江戸屋山道→ゴロタ岬(360°絶景)→ゴロタ浜(急下り注意)→鉄府→澄海岬(エメラルドの海)→浜中\n\n12.4km/約5h20m。常に強風で体感-5〜10℃。水1L以上、コース中トイレは西上泊のみ。\n\n⚠ 浜中→香深港バスは11:50台の次が18時台。17:05フェリーに逆算。",
      },
      {
        time: "14:30",
        title: "ランチ",
        type: "food",
        tags: ["海鮮"],
        desc: "トレッキング後の空腹に島の海鮮を。ホッケのちゃんちゃん焼き（礼文名物）やウニ丼。炉ばたちどりがおすすめ。",
      },
      { time: "15:30", title: "♨ うすゆきの湯", type: "onsen", desc: "礼文島唯一の温泉。¥600。16:30には出て港へ。17:05の最終便に乗り遅れると島で一泊確定。" },
      { time: "17:05", title: "🚢 礼文→稚内", type: "move", desc: "最終便。18:55稚内着。ドーミーインで温泉＋夜鳴きそばで回復。翌日の長距離に備えて早寝。" },
    ],
    warnings: [
      "常に強風。体感温度は-5〜10°C",
      "4月は残雪あり。rebun-trail.jpで通行確認",
      "浜中→香深港バスは11:50台→次は18時台",
      "コース中トイレは西上泊のみ。水1L以上",
      "携帯圏外エリアあり",
    ],
    gourmet: [
      { name: "炉ばた ちどり", note: "ホッケちゃんちゃん焼き元祖。香深港徒歩5分。炭火+味噌+生ビール。", tags: ["ホッケ"] },
      { name: "海鮮処 かふか", note: "ウニ丼。4月末はシーズンギリギリ（旬は6月〜）。", tags: ["ウニ"] },
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
    events: [
      {
        time: "09:00",
        title: "🏍 バイクレンタル出発",
        type: "spot",
        tags: ["バイク"],
        important: true,
        desc: "釧路市内でレンタル開始。完全防寒で出撃。気温は低いのでネックウォーマーやインナータイツ等必須。",
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
        title: "バイク返却",
        type: "spot",
        important: true,
        desc: "釧路市内に帰還。※17時まで借りられるが、4月の北海道での長時間ライディングは風冷えによる体力消耗がエグいため、この時間に戻って車に乗り換えるのが疲労マネジメント的にベスト。",
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

/* ── Components ── */
function Anim({ children, delay = 0 }) {
  const r = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = r.current;
    if (!el) return;
    const o = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setV(true);
          o.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    o.observe(el);
    return () => o.disconnect();
  }, []);
  return (
    <div
      ref={r}
      style={{
        opacity: v ? 1 : 0,
        transform: v ? "translateY(0)" : "translateY(18px)",
        transition: `opacity .5s cubic-bezier(.4,0,.2,1) ${delay}s, transform .5s cubic-bezier(.4,0,.2,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function EventCard({ ev, idx }) {
  const [open, setOpen] = useState(false);
  const c = { food: "#d4553a", spot: "#5ba4c9", stay: "#9b7ec8", onsen: "#2a5a3e", move: "#8a7f72" }[ev.type] || "#ccc";
  return (
    <Anim delay={idx * 0.06}>
      <div
        onClick={() => setOpen(!open)}
        style={{
          borderLeft: `3px solid ${c}`,
          background: "#fff",
          borderRadius: 12,
          padding: "10px 14px",
          marginTop: 6,
          cursor: "pointer",
          transition: "all .35s cubic-bezier(.4,0,.2,1)",
          boxShadow: open ? "0 6px 24px rgba(0,0,0,.09)" : "0 1px 4px rgba(0,0,0,.03)",
          transform: open ? "scale(1.008)" : "scale(1)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
              <span style={{ fontWeight: 700, fontSize: 14, color: "#1a3a2a" }}>{ev.title}</span>
              {ev.important && (
                <span
                  style={{
                    fontSize: 9,
                    background: "#d4553a",
                    color: "#fff",
                    padding: "2px 7px",
                    borderRadius: 6,
                    fontWeight: 700,
                    animation: "pulse 2s infinite",
                  }}
                >
                  必須
                </span>
              )}
              {ev.optional && (
                <span style={{ fontSize: 9, background: "#ede6d8", color: "#8a7f72", padding: "2px 7px", borderRadius: 6 }}>
                  余裕あれば
                </span>
              )}
            </div>
            {ev.tags && (
              <div style={{ display: "flex", gap: 4, marginTop: 3, flexWrap: "wrap" }}>
                {ev.tags.map((t) => (
                  <span key={t} style={{ fontSize: 9, color: c, background: `${c}14`, padding: "1px 6px", borderRadius: 6, fontWeight: 600 }}>
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div style={{ textAlign: "right", flexShrink: 0 }}>
            <span style={{ fontSize: 11, color: "#8a7f72", fontFamily: "'M PLUS Rounded 1c'", fontWeight: 700 }}>{ev.time}</span>
            <span style={{ fontSize: 14, color: c, display: "inline-block", transition: "transform .3s", transform: open ? "rotate(180deg)" : "none", lineHeight: 1, marginTop: 2 }}>▾</span>
          </div>
        </div>
        <div
          style={{
            maxHeight: open ? 2000 : 0,
            overflow: "hidden",
            transition: "max-height .5s cubic-bezier(.4,0,.2,1)",
            opacity: open ? 1 : 0,
            transitionProperty: "max-height, opacity",
            transitionDuration: open ? ".5s, .3s" : ".3s, .2s",
          }}
        >
          <div style={{ paddingTop: 10, fontSize: 13, color: "#5c5347", lineHeight: 1.8, whiteSpace: "pre-line" }}>{ev.desc}</div>
          {(ev.price || ev.hours || ev.tel || ev.addr) && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8, fontSize: 11 }}>
              {ev.price && <span style={{ background: "#faf8f5", padding: "3px 8px", borderRadius: 8 }}>💰 {ev.price}</span>}
              {ev.hours && <span style={{ background: "#faf8f5", padding: "3px 8px", borderRadius: 8 }}>🕐 {ev.hours}</span>}
              {ev.addr && <span style={{ background: "#faf8f5", padding: "3px 8px", borderRadius: 8 }}>📍 {ev.addr}</span>}
              {ev.tel && (
                <a href={`tel:${ev.tel}`} style={{ background: "#2a5a3e10", padding: "3px 8px", borderRadius: 8, color: "#2a5a3e", textDecoration: "none", fontWeight: 600 }}>
                  📞 {ev.tel}
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </Anim>
  );
}

function RentalCarCard({ car }) {
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
      <div
        style={{
          background: open ? "linear-gradient(135deg,#e8f4ea,#f5faf6)" : "linear-gradient(135deg,rgba(42,90,62,.06),#faf8f5)",
          border: "1px solid rgba(42,90,62,.18)",
          borderRadius: 12,
          marginBottom: 10,
          overflow: "hidden",
          transition: "all .35s cubic-bezier(.4,0,.2,1)",
          boxShadow: open ? "0 4px 16px rgba(42,90,62,.1)" : "0 1px 4px rgba(0,0,0,.03)",
        }}
      >
        <button
          onClick={() => setOpen(!open)}
          style={{
            width: "100%",
            background: "none",
            border: "none",
            padding: "10px 12px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontFamily: "inherit",
            textAlign: "left",
          }}
        >
          <span style={{ fontSize: 20 }}>🚗</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 10, color: "#8a7f72", fontWeight: 500 }}>レンタカー予約</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#1a3a2a" }}>{car.company}</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 3 }}>
            <span
              onClick={handleCopy}
              style={{
                fontSize: 10, color: "#2a5a3e", fontWeight: 700,
                background: copied ? "rgba(42,90,62,.22)" : "rgba(42,90,62,.1)",
                padding: "2px 7px", borderRadius: 6, cursor: "pointer",
                transition: "background .2s", userSelect: "none",
              }}
            >
              {copied ? "✓ コピー済み" : car.reservationNo}
            </span>
            <span style={{ fontSize: 14, color: "#2a5a3e", display: "inline-block", transition: "transform .3s", transform: open ? "rotate(180deg)" : "none", lineHeight: 1 }}>▾</span>
          </div>
        </button>
        <div
          style={{
            maxHeight: open ? 1000 : 0,
            overflow: "hidden",
            opacity: open ? 1 : 0,
            transitionProperty: "max-height, opacity",
            transitionDuration: open ? ".45s, .3s" : ".3s, .15s",
            transitionTimingFunction: "cubic-bezier(.4,0,.2,1)",
          }}
        >
          <div style={{ padding: "0 12px 12px", borderTop: "1px solid rgba(42,90,62,.08)" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginTop: 10 }}>
              {[
                ["📅 貸出", `${car.pickup}\n${car.pickupNote}`],
                ["📅 返却", car.dropoff],
                ["👤 予約者", car.reservedBy],
                ["💰 料金", car.price],
              ].map(([label, value]) => (
                <div key={label} style={{ background: "rgba(255,255,255,.75)", borderRadius: 8, padding: "8px 10px", border: "1px solid rgba(42,90,62,.08)" }}>
                  <div style={{ fontSize: 10, color: "#8a7f72", marginBottom: 2 }}>{label}</div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#1a3a2a", whiteSpace: "pre-line", lineHeight: 1.5 }}>{value}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 6, background: "rgba(255,255,255,.75)", borderRadius: 8, padding: "8px 10px", border: "1px solid rgba(42,90,62,.08)" }}>
              <div style={{ fontSize: 10, color: "#8a7f72", marginBottom: 2 }}>🛡 補償</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#1a3a2a" }}>{car.insurance}</div>
            </div>
            {car.addr && (
              <div style={{ marginTop: 6, background: "rgba(255,255,255,.75)", borderRadius: 8, padding: "8px 10px", border: "1px solid rgba(42,90,62,.08)" }}>
                <div style={{ fontSize: 10, color: "#8a7f72", marginBottom: 2 }}>📍 店舗住所</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: "#1a3a2a" }}>{car.addr}</div>
              </div>
            )}
            <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 5 }}>
              {car.notes.map((note, i) => (
                <div key={i} style={{ fontSize: 12, color: "#5c5347", lineHeight: 1.7, background: "rgba(212,85,58,.04)", border: "1px solid rgba(212,85,58,.12)", borderRadius: 8, padding: "7px 10px" }}>
                  ⚠ {note}
                </div>
              ))}
            </div>
            <a
              href={`tel:${car.tel}`}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                marginTop: 10,
                padding: "9px",
                background: "#2a5a3e",
                color: "#fff",
                borderRadius: 10,
                textDecoration: "none",
                fontSize: 13,
                fontWeight: 700,
                fontFamily: "inherit",
              }}
            >
              📞 {car.tel}（到着後に電話）
            </a>
          </div>
        </div>
      </div>
    </Anim>
  );
}

function FlightsCard({ flights }) {
  const [open, setOpen] = useState(false);
  const summary = [
    flights.outbound && flights.outbound.flight,
    flights.returns  && `復路${flights.returns.length}便`,
  ].filter(Boolean).join(" ／ ");
  return (
    <Anim>
      <div
        style={{
          background: open ? "linear-gradient(135deg,#e8f0fa,#f5f8ff)" : "linear-gradient(135deg,rgba(91,164,201,.07),#faf8f5)",
          border: "1px solid rgba(91,164,201,.2)",
          borderRadius: 12,
          marginBottom: 10,
          overflow: "hidden",
          transition: "all .35s cubic-bezier(.4,0,.2,1)",
          boxShadow: open ? "0 4px 16px rgba(91,164,201,.12)" : "0 1px 4px rgba(0,0,0,.03)",
        }}
      >
        <button
          onClick={() => setOpen(!open)}
          style={{
            width: "100%",
            background: "none",
            border: "none",
            padding: "10px 12px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontFamily: "inherit",
            textAlign: "left",
          }}
        >
          <span style={{ fontSize: 20 }}>✈️</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 10, color: "#8a7f72", fontWeight: 500 }}>フライト情報</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#1a3a2a" }}>{summary}</div>
          </div>
          <span style={{ fontSize: 14, color: "#5ba4c9", display: "inline-block", transition: "transform .3s", transform: open ? "rotate(180deg)" : "none", lineHeight: 1 }}>▾</span>
        </button>
        <div
          style={{
            maxHeight: open ? 1000 : 0,
            overflow: "hidden",
            opacity: open ? 1 : 0,
            transitionProperty: "max-height, opacity",
            transitionDuration: open ? ".45s, .3s" : ".3s, .15s",
            transitionTimingFunction: "cubic-bezier(.4,0,.2,1)",
          }}
        >
          <div style={{ padding: "0 12px 12px", borderTop: "1px solid rgba(91,164,201,.1)" }}>
            {flights.outbound && (
              <div style={{ marginTop: 10 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: "#5ba4c9", letterSpacing: 1, marginBottom: 6 }}>
                  ▶ 往路（{flights.outbound.date} · {flights.outbound.note}）
                </div>
                <div style={{ background: "rgba(255,255,255,.8)", borderRadius: 8, padding: "10px 12px", border: "1px solid rgba(91,164,201,.12)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 13, fontWeight: 800, color: "#1a3a2a" }}>{flights.outbound.flight}</span>
                    <span style={{ fontSize: 12, color: "#5ba4c9", fontWeight: 700 }}>{flights.outbound.departure}</span>
                  </div>
                  <div style={{ fontSize: 12, color: "#5c5347", marginTop: 4 }}>{flights.outbound.route}</div>
                </div>
              </div>
            )}
            {flights.returns && (
              <div style={{ marginTop: 10 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: "#5ba4c9", letterSpacing: 1, marginBottom: 6 }}>
                  ◀ 復路（4/30(木) · 新千歳解散）
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {flights.returns.map((r, i) => (
                    <div key={i} style={{ background: "rgba(255,255,255,.8)", borderRadius: 8, padding: "10px 12px", border: "1px solid rgba(91,164,201,.12)" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: "#5ba4c9", background: "rgba(91,164,201,.12)", padding: "1px 7px", borderRadius: 6 }}>{r.name}</span>
                        <span style={{ fontSize: 13, fontWeight: 800, color: "#1a3a2a" }}>{r.flight}</span>
                        <span style={{ fontSize: 12, color: "#5ba4c9", fontWeight: 700 }}>{r.departure}</span>
                      </div>
                      <div style={{ fontSize: 12, color: "#5c5347", marginTop: 4 }}>{r.route}</div>
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

function DayView({ day }) {
  const [showG, setShowG] = useState(false);
  return (
    <div style={{ padding: "0 16px 24px" }}>
      {day.stay && (
        <Anim>
          <div
            style={{
              background: "linear-gradient(135deg,#9b7ec810,#faf8f5)",
              border: "1px solid rgba(155,126,200,.15)",
              borderRadius: 10,
              padding: "10px 12px",
              marginBottom: 10,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 20 }}>{day.stayIcon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 10, color: "#8a7f72", fontWeight: 500 }}>この日の宿泊</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#1a3a2a" }}>{day.stay}</div>
              </div>
              {day.stayPrice && (
                <div style={{ fontSize: 11, color: "#9b7ec8", fontWeight: 700, textAlign: "right", flexShrink: 0 }}>{day.stayPrice}</div>
              )}
            </div>
            {day.stayNote && (
              <div style={{ fontSize: 11, color: "#5c5347", marginTop: 6, lineHeight: 1.6, paddingLeft: 30 }}>{day.stayNote}</div>
            )}
          </div>
        </Anim>
      )}

      {day.rentalCar && <RentalCarCard car={day.rentalCar} />}
      {day.flights && <FlightsCard flights={day.flights} />}

      {day.highlight && (
        <Anim>
          <div style={{ background: `linear-gradient(135deg,${day.color},${day.color}cc)`, borderRadius: 14, padding: "14px 16px", marginBottom: 14, color: "#fff" }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, opacity: 0.7, marginBottom: 4 }}>HIGHLIGHT</div>
            <div style={{ fontSize: 13, lineHeight: 1.7, opacity: 0.9 }}>{day.highlight}</div>
          </div>
        </Anim>
      )}

      {day.trek && (
        <Anim delay={0.05}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 6, marginBottom: 14 }}>
            {[
              ["距離", day.trek.distance],
              ["時間", day.trek.time],
              ["難度", day.trek.level],
              ["標高", day.trek.elevation],
            ].map(([l, v]) => (
              <div key={l} style={{ background: "#fff", borderRadius: 10, padding: "8px 4px", textAlign: "center", border: "1px solid rgba(139,111,71,.1)" }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: "#1a3a2a", fontFamily: "'M PLUS Rounded 1c'" }}>{v}</div>
                <div style={{ fontSize: 10, color: "#8a7f72", marginTop: 2 }}>{l}</div>
              </div>
            ))}
          </div>
        </Anim>
      )}

      <Anim delay={0.08}>
        <div style={{ borderRadius: 14, overflow: "hidden", border: "1px solid rgba(139,111,71,.1)", height: 170, marginBottom: 12, boxShadow: "0 2px 12px rgba(0,0,0,.05)" }}>
          <iframe title="map" src={`https://maps.google.com/maps?q=${encodeURIComponent(day.mapQuery)}&z=7&output=embed&hl=ja`} style={{ width: "100%", height: "100%", border: "none" }} loading="lazy" />
        </div>
      </Anim>

      <div style={{ position: "relative", paddingLeft: 20 }}>
        <div style={{ position: "absolute", left: 5, top: 8, bottom: 0, width: 2, background: "linear-gradient(to bottom,#2a5a3e44,transparent)", borderRadius: 1 }} />
        {day.events.map((ev, i) => (
          <div key={i} style={{ position: "relative", marginBottom: 4 }}>
            <div
              style={{
                position: "absolute",
                left: -20,
                top: 14,
                width: ev.important ? 12 : 8,
                height: ev.important ? 12 : 8,
                borderRadius: "50%",
                background: ev.important ? "#d4553a" : "#2a5a3e",
                border: "2px solid #faf8f5",
                boxShadow: ev.important ? "0 0 0 2px #d4553a,0 0 8px rgba(212,85,58,.3)" : "0 0 0 2px #2a5a3e",
                transition: "all .3s",
              }}
            />
            <EventCard ev={ev} idx={i} />
          </div>
        ))}
      </div>

      {day.warnings?.length > 0 && (
        <Anim>
          <div style={{ background: "rgba(212,85,58,.04)", border: "1px solid rgba(212,85,58,.12)", borderRadius: 10, padding: "10px 12px", marginTop: 12 }}>
            {day.warnings.map((w, i) => (
              <div key={i} style={{ fontSize: 12, color: "#5c5347", lineHeight: 1.7, paddingBottom: 2 }}>
                {w}
              </div>
            ))}
          </div>
        </Anim>
      )}

      {day.gourmet?.length > 0 && (
        <Anim>
          <div style={{ marginTop: 14 }}>
            <button
              onClick={() => setShowG(!showG)}
              style={{
                width: "100%",
                background: "none",
                border: "1px dashed rgba(212,85,58,.25)",
                borderRadius: 10,
                padding: "10px 12px",
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                color: "#d4553a",
                fontWeight: 700,
                fontSize: 13,
                fontFamily: "inherit",
              }}
            >
              <span>🍽 グルメおすすめ {day.gourmet.length}件</span>
              <span style={{ transform: showG ? "rotate(180deg)" : "none", transition: ".3s" }}>▼</span>
            </button>
            <div style={{ maxHeight: showG ? 2000 : 0, overflow: "hidden", transition: "max-height .5s cubic-bezier(.4,0,.2,1)" }}>
              {day.gourmet.map((g, i) => (
                <div key={i} style={{ background: "linear-gradient(135deg,#fff9f5,#fff)", border: "1px solid rgba(212,85,58,.1)", borderRadius: 10, padding: "8px 12px", marginTop: 4 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontWeight: 700, fontSize: 13, color: "#d4553a" }}>{g.name}</span>
                    {g.tel && (
                      <a href={`tel:${g.tel}`} style={{ fontSize: 11, color: "#2a5a3e", textDecoration: "none" }}>
                        📞
                      </a>
                    )}
                  </div>
                  <p style={{ fontSize: 12, color: "#5c5347", marginTop: 2, lineHeight: 1.6 }}>{g.note}</p>
                  {g.tags && (
                    <div style={{ display: "flex", gap: 4, marginTop: 3, flexWrap: "wrap" }}>
                      {g.tags.map((t) => (
                        <span key={t} style={{ fontSize: 9, color: "#d4553a", background: "rgba(212,85,58,.06)", padding: "1px 6px", borderRadius: 6 }}>
                          {t}
                        </span>
                      ))}
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
  const [ck, setCk] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("hk_cl") || "{}");
    } catch {
      return {};
    }
  });
  const toggle = (k) => {
    const n = { ...ck, [k]: !ck[k] };
    setCk(n);
    try {
      localStorage.setItem("hk_cl", JSON.stringify(n));
    } catch {
      // ignore
    }
  };
  const total = CHECKLIST.reduce((a, c) => a + c.items.length, 0);
  const done = Object.values(ck).filter(Boolean).length;
  return (
    <div style={{ padding: "0 16px 24px" }}>
      <Anim>
        <div style={{ background: "#fff", borderRadius: 12, padding: "10px 14px", marginBottom: 14, display: "flex", alignItems: "center", gap: 12, border: "1px solid rgba(139,111,71,.1)" }}>
          <span style={{ fontSize: 14, color: "#2a5a3e", fontWeight: 800, fontFamily: "'M PLUS Rounded 1c'", minWidth: 42 }}>
            {done}/{total}
          </span>
          <div style={{ flex: 1, height: 6, background: "#ede6d8", borderRadius: 3, overflow: "hidden" }}>
            <div style={{ width: `${(done / total) * 100}%`, height: "100%", background: "linear-gradient(90deg,#2a5a3e,#5ba4c9)", borderRadius: 3, transition: "width .4s" }} />
          </div>
          {done === total && <span style={{ fontSize: 14 }}>🎉</span>}
        </div>
      </Anim>
      {CHECKLIST.map((cat, ci) => (
        <Anim key={ci} delay={ci * 0.04}>
          <div style={{ marginBottom: 18 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#1a3a2a", marginBottom: 8, paddingLeft: 2 }}>{cat.cat}</div>
            {cat.items.map((item, ii) => {
              const k = `${ci}-${ii}`;
              const d = ck[k];
              return (
                <div
                  key={k}
                  onClick={() => toggle(k)}
                  style={{
                    background: d ? "#f5f0e8" : "#fff",
                    opacity: d ? 0.45 : 1,
                    border: "1px solid rgba(139,111,71,.08)",
                    borderRadius: 10,
                    padding: "10px 12px",
                    marginBottom: 5,
                    display: "flex",
                    gap: 10,
                    alignItems: "flex-start",
                    cursor: "pointer",
                    transition: "all .3s cubic-bezier(.4,0,.2,1)",
                    transform: d ? "scale(.98)" : "scale(1)",
                  }}
                >
                  <div
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: 6,
                      border: d ? "2px solid #2a5a3e" : "2px solid #ccc",
                      background: d ? "#2a5a3e" : "transparent",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      transition: ".3s",
                      marginTop: 1,
                    }}
                  >
                    {d && <span style={{ color: "#fff", fontSize: 12, fontWeight: 700 }}>✓</span>}
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#1a3a2a" }}>{item.name}</div>
                    <div style={{ fontSize: 11, color: "#8a7f72", marginTop: 2, lineHeight: 1.6 }}>{item.sub}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </Anim>
      ))}
    </div>
  );
}

/* ── App ── */
export default function App() {
  const [tab, setTab] = useState("day");
  const [ad, setAd] = useState(0);
  return (
    <div style={{ fontFamily: "'Zen Maru Gothic',sans-serif", background: "#faf8f5", minHeight: "100vh", maxWidth: 480, margin: "0 auto" }}>
      <link
        href="https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@400;500;700;900&family=Kaisei+Decol:wght@400;700&family=M+PLUS+Rounded+1c:wght@300;400;500;700;800&display=swap"
        rel="stylesheet"
      />
      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.6}}@keyframes slideUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}*{-webkit-tap-highlight-color:rgba(26,58,42,.08)}a,button{touch-action:manipulation}`}</style>

      <div style={{ background: "linear-gradient(175deg,#0f2419 0%,#1a3a2a 40%,#2a5a3e 70%,#3d7a5a 100%)", padding: "52px 24px 36px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 40, background: "#faf8f5", clipPath: "polygon(0 60%,30% 30%,55% 50%,80% 20%,100% 45%,100% 100%,0 100%)" }} />
        <div style={{ fontSize: 10, letterSpacing: 4, color: "#a8d8ea", marginBottom: 14, animation: "slideUp .8s .2s both" }}>2026.04.24 — 04.30</div>
        <div style={{ fontFamily: "'Kaisei Decol',serif", fontSize: 44, fontWeight: 700, color: "#fff", lineHeight: 1.1, textShadow: "0 4px 24px rgba(0,0,0,.3)", animation: "slideUp .8s .4s both" }}>北の大地</div>
        <div style={{ fontFamily: "'Kaisei Decol',serif", fontSize: 14, color: "#a8d8ea", marginTop: 6, animation: "slideUp .8s .6s both" }}>歩く・走る・食う — 6泊7日</div>
        <div style={{ display: "inline-grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 22, animation: "slideUp .8s .8s both" }}>
          {[
            ["7", "DAYS"],
            ["1,540km", "DRIVE"],
            ["12.4km", "TREK"],
            ["∞", "FOOD"],
          ].map(([n, l]) => (
            <div key={l} style={{ background: "rgba(255,255,255,.08)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,.12)", borderRadius: 12, padding: "8px 12px", minWidth: 68 }}>
              <div style={{ fontFamily: "'M PLUS Rounded 1c'", fontSize: 16, fontWeight: 800, color: "#fff" }}>{n}</div>
              <div style={{ fontSize: 8, color: "#a8d8ea", letterSpacing: 2, marginTop: 2 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", background: "#fff", borderBottom: "1px solid rgba(139,111,71,.1)", position: "sticky", top: 0, zIndex: 100 }}>
        {[
          ["day", "📋 行程"],
          ["check", "✅ 持ち物"],
          ["tips", "⚠ 注意"],
        ].map(([id, lb]) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            style={{
              flex: 1,
              padding: "12px 0",
              border: "none",
              background: "none",
              fontFamily: "inherit",
              fontSize: 12,
              fontWeight: tab === id ? 700 : 500,
              color: tab === id ? "#1a3a2a" : "#8a7f72",
              borderBottom: tab === id ? "2.5px solid #1a3a2a" : "2.5px solid transparent",
              cursor: "pointer",
              transition: ".2s",
            }}
          >
            {lb}
          </button>
        ))}
      </div>

      {tab === "day" && (
        <>
          <div style={{ display: "flex", gap: 6, padding: "12px 16px", overflowX: "auto", WebkitOverflowScrolling: "touch", position: "sticky", top: 44, zIndex: 99, background: "rgba(250,248,245,.95)", backdropFilter: "blur(12px)" }}>
            {DAYS.map((d, i) => (
              <button
                key={d.id}
                onClick={() => setAd(i)}
                style={{
                  flexShrink: 0,
                  border: ad === i ? "none" : "1px solid rgba(139,111,71,.15)",
                  background: ad === i ? d.color : "transparent",
                  color: ad === i ? "#fff" : "#5c5347",
                  borderRadius: 20,
                  padding: "6px 14px",
                  fontFamily: "inherit",
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "all .3s cubic-bezier(.4,0,.2,1)",
                  whiteSpace: "nowrap",
                  transform: ad === i ? "scale(1.05)" : "scale(1)",
                }}
              >
                D{d.id}
                {[3, 5, 6].includes(d.id) ? " ★" : ""}
              </button>
            ))}
          </div>
          {(() => {
            const d = DAYS[ad];
            return (
              <div key={d.id}>
                <div style={{ padding: "16px 16px 12px", display: "flex", alignItems: "center", gap: 14 }}>
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: "50%",
                      background: `linear-gradient(135deg,${d.color},${d.color}88)`,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      flexShrink: 0,
                      transition: "all .4s",
                      boxShadow: `0 4px 16px ${d.color}44`,
                    }}
                  >
                    <span style={{ fontFamily: "'M PLUS Rounded 1c'", fontSize: 20, fontWeight: 800, lineHeight: 1 }}>{d.id}</span>
                    <span style={{ fontSize: 8, letterSpacing: 1, opacity: 0.8 }}>DAY</span>
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Kaisei Decol',serif", fontSize: 18, fontWeight: 700, color: "#1a3a2a", lineHeight: 1.3 }}>{d.title}</div>
                    <div style={{ fontSize: 12, color: "#8a7f72" }}>
                      {d.date} · {d.subtitle}
                      {d.km > 0 ? ` · ${d.km}km` : ""}
                    </div>
                  </div>
                </div>
                <DayView day={d} />
              </div>
            );
          })()}
        </>
      )}

      {tab === "check" && (
        <div style={{ paddingTop: 16 }}>
          <div style={{ padding: "0 16px 4px", fontFamily: "'Kaisei Decol',serif", fontSize: 18, fontWeight: 700, color: "#1a3a2a" }}>持ち物チェックリスト</div>
          <div style={{ padding: "0 16px 8px", fontSize: 12, color: "#8a7f72" }}>タップで準備完了にマーク</div>
          <ChecklistView />
        </div>
      )}

      {tab === "tips" && (
        <div style={{ paddingTop: 16 }}>
          <div style={{ padding: "0 16px 4px", fontFamily: "'Kaisei Decol',serif", fontSize: 18, fontWeight: 700, color: "#1a3a2a" }}>北海道ドライブの注意点</div>
          <div style={{ padding: "0 16px 8px", fontSize: 12, color: "#8a7f72" }}>命に関わるので読んで</div>
          <div style={{ padding: "0 16px 24px" }}>
            <div style={{ display: "grid", gap: 8 }}>
              {TIPS.map((t, i) => (
                <Anim key={i} delay={i * 0.06}>
                  <div style={{ background: "#fff", borderRadius: 12, padding: "12px 14px", border: "1px solid rgba(139,111,71,.08)" }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#1a3a2a" }}>
                      {t.icon} {t.title}
                    </div>
                    <div style={{ fontSize: 12, color: "#5c5347", marginTop: 4, lineHeight: 1.7 }}>{t.text}</div>
                  </div>
                </Anim>
              ))}
            </div>
            <Anim delay={0.3}>
              <div style={{ background: "#fff", border: "2px solid rgba(212,85,58,.15)", borderRadius: 12, padding: "14px", marginTop: 14 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#d4553a", marginBottom: 8 }}>📞 緊急連絡先</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                  {EMER.map((e) => (
                    <a key={e.l} href={`tel:${e.v}`} style={{ fontSize: 13, color: "#1a3a2a", textDecoration: "none" }}>
                      <strong>{e.l}:</strong> {e.v}
                    </a>
                  ))}
                </div>
              </div>
            </Anim>
          </div>
        </div>
      )}

      <div style={{ textAlign: "center", padding: "32px 16px 28px", color: "#8a7f72", fontSize: 12 }}>
        <div style={{ fontFamily: "'Kaisei Decol',serif", fontSize: 16, color: "#1a3a2a", marginBottom: 4 }}>良い旅を 🍻</div>
        <div>札幌→稚内→礼文→北見→知床→釧路→帯広→新千歳</div>
      </div>
    </div>
  );
}





