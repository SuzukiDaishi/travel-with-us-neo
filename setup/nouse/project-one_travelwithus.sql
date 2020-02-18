-- phpMyAdmin SQL Dump
-- version 4.9.4
-- https://www.phpmyadmin.net/
--
-- ホスト: mysql625.db.sakura.ne.jp
-- 生成日時: 2020 年 2 月 18 日 18:48
-- サーバのバージョン： 5.7.28-log
-- PHP のバージョン: 7.1.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- データベース: `project-one_travelwithus`
--

-- --------------------------------------------------------

--
-- テーブルの構造 `post`
--

CREATE TABLE `post` (
  `id` int(11) NOT NULL,
  `user_name` varchar(100) DEFAULT NULL,
  `post_image` text,
  `text` text,
  `spot_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- テーブルのデータのダンプ `post`
--

INSERT INTO `post` (`id`, `user_name`, `post_image`, `text`, `spot_id`) VALUES
(12, 'Tsubasa', 'http://travelwithus.sodeproject.com/postimgs/post_img_5daff23d07b5b.jpeg', 'tgsidbdbshdhshshisjbsbs', 3),
(13, 'James', 'http://travelwithus.sodeproject.com/postimgs/post_img_5db25411161a7.jpeg', 'あごだし', 3),
(14, 'James', 'http://travelwithus.sodeproject.com/postimgs/post_img_5db2541802cfc.jpeg', 'あごだし', 3),
(15, 'James', 'http://travelwithus.sodeproject.com/postimgs/post_img_5db254199b28f.jpeg', 'あごだし', 3),
(16, 'James', 'http://travelwithus.sodeproject.com/postimgs/post_img_5db2541b7ce3c.jpeg', 'あごだし', 3),
(17, 'test', 'http://travelwithus.sodeproject.com/postimgs/post_img_5db2565892dda.jpeg', 'test', 3),
(18, 'test', 'http://travelwithus.sodeproject.com/postimgs/post_img_5db2568ec0823.jpeg', 'test', 3),
(19, 'test', 'http://travelwithus.sodeproject.com/postimgs/post_img_5db256fda0495.jpeg', 'test', 3),
(20, 'No name(Ren)', 'http://travelwithus.sodeproject.com/postimgs/post_img_5db26760aa0dc.jpeg', 'He is from China\nHe went to Kenrokuen and Omicho market\n,Restraurant.\nHe ate some seafoods. These were really good.', 3),
(21, 'together', 'http://travelwithus.sodeproject.com/postimgs/post_img_5db26807b1dff.jpeg', 'start travel toure', 3),
(22, 'together', 'http://travelwithus.sodeproject.com/postimgs/post_img_5db26809637eb.jpeg', 'start travel toure', 3),
(23, 'Alba Cardona Jiménez', 'http://travelwithus.sodeproject.com/postimgs/post_img_5db2683a40576.jpeg', 'Hi from Spain', 3),
(24, 'Alba Cardona Jiménez', 'http://travelwithus.sodeproject.com/postimgs/post_img_5db2683e1c73a.jpeg', 'Hi from Spain', 3),
(25, 'Karen', 'http://travelwithus.sodeproject.com/postimgs/post_img_5db2698fb40ff.jpeg', 'They are from South Africa.\nThey are traveling in Japan for rugby game for three weeks.', 3),
(26, 'Werner', 'http://travelwithus.sodeproject.com/postimgs/post_img_5db26a9a113cd.jpeg', 'First day in Kanazawa?', 3),
(27, 'Natty', 'http://travelwithus.sodeproject.com/postimgs/post_img_5db26c820198d.jpeg', 'She is from China. \nShe went to Omicho market.\nShe ate good seafood.', 3),
(28, 'Silvio Tardelli Uehara', 'http://travelwithus.sodeproject.com/postimgs/post_img_5db26cddc17ed.jpeg', 'Amazing view of Japan at Kanazawa Renrokuen Garden', 3),
(29, 'Silvio Tardelli Uehara', 'http://travelwithus.sodeproject.com/postimgs/post_img_5db26cdec17e0.jpeg', 'Amazing view of Japan at Kanazawa Renrokuen Garden', 3),
(30, 'Silvio Tardelli Uehara', 'http://travelwithus.sodeproject.com/postimgs/post_img_5db26ce132a9b.jpeg', 'Amazing view of Japan at Kanazawa Renrokuen Garden', 3),
(31, 'first', 'http://travelwithus.sodeproject.com/postimgs/post_img_5db26cebd8b00.jpeg', 'omityo itiba\nfrom Australia', 3),
(32, 'first', 'http://travelwithus.sodeproject.com/postimgs/post_img_5db26cf30a238.jpeg', 'omityo itiba\nfrom Australia', 3),
(33, 'first', 'http://travelwithus.sodeproject.com/postimgs/post_img_5db26cf3cbbfd.jpeg', 'omityo itiba\nfrom Australia', 3),
(34, 'second', 'http://travelwithus.sodeproject.com/postimgs/post_img_5db27035c277d.jpeg', 'Venezuela\nwalter\n', 3),
(35, 'second', 'http://travelwithus.sodeproject.com/postimgs/post_img_5db270391791a.jpeg', 'Venezuela\nwalter\n', 3),
(36, 'third', 'http://travelwithus.sodeproject.com/postimgs/post_img_5db270d1073a4.jpeg', 'Australia', 3),
(37, 'Grill Otsuka', 'http://travelwithus.sodeproject.com/postimgs/post_img_5db271a452330.jpeg', ' ', 3),
(38, 'Grill Otsuka', 'http://travelwithus.sodeproject.com/postimgs/post_img_5db271a67d229.jpeg', ' ', 3),
(39, 'fourth', 'http://travelwithus.sodeproject.com/postimgs/post_img_5db2735e117a7.jpeg', 'Ireland', 3),
(40, 'Maya ', 'http://travelwithus.sodeproject.com/postimgs/post_img_5db276b2ed317.jpeg', 'Absolutely beautiful, the best garden i’ve seen in Japan. \n\nAustralia ', 1),
(41, 'Natty', 'http://travelwithus.sodeproject.com/postimgs/post_img_5db27a6f15612.jpeg', 'At Ohmicho market', 1),
(42, 'Natty', 'http://travelwithus.sodeproject.com/postimgs/post_img_5db27a7aa3f42.jpeg', 'At Ohmicho market', 1),
(43, 'Natty', 'http://travelwithus.sodeproject.com/postimgs/post_img_5db27a90c2f45.jpeg', 'At Ohmicho market', 1),
(44, 'Natty', 'http://travelwithus.sodeproject.com/postimgs/post_img_5db27a930e497.jpeg', 'At Ohmicho market', 1),
(45, 'Daniel', 'http://travelwithus.sodeproject.com/postimgs/post_img_5db27b17958b9.jpeg', 'Hello kanazawa\nWe enjoyed the museum very much \nLove\nIsrael', 3),
(46, 'Daniel', 'http://travelwithus.sodeproject.com/postimgs/post_img_5db27b24b3d22.jpeg', 'Hello kanazawa\nWe enjoyed the museum very much \nLove\nIsrael', 3),
(47, 'Daniel', 'http://travelwithus.sodeproject.com/postimgs/post_img_5db27b2901999.jpeg', 'Hello kanazawa\nWe enjoyed the museum very much \nLove\nIsrael', 3),
(48, 'Roanne Evans', 'http://travelwithus.sodeproject.com/postimgs/post_img_5db27c75a1041.jpeg', 'Museum contemporary art', 3),
(49, 'John ', 'http://travelwithus.sodeproject.com/postimgs/post_img_5db27c8a44bcf.jpeg', 'Kanazawa castle!!\nAmerica', 3),
(50, 'mees', 'http://travelwithus.sodeproject.com/postimgs/post_img_5db27e881ea6d.jpeg', 'great work guys smart idea', 3),
(51, 'mees', 'http://travelwithus.sodeproject.com/postimgs/post_img_5db27e89c5a5f.jpeg', 'great work guys smart idea', 3),
(52, 'Francisca Fuenzalida', 'http://travelwithus.sodeproject.com/postimgs/post_img_5db2b50e29e0c.jpeg', 'My name is Kika, I’m from Chile and in the picture we where at the Kanazawa Castle with our new friends :) \nThanks for everything! ', 3),
(53, 'Francisca Fuenzalida', 'http://travelwithus.sodeproject.com/postimgs/post_img_5db2b50f2a09b.jpeg', 'My name is Kika, I’m from Chile and in the picture we where at the Kanazawa Castle with our new friends :) \nThanks for everything! ', 3),
(54, 'Walter Bishop', 'http://travelwithus.sodeproject.com/postimgs/post_img_5db2b55b06f91.jpeg', 'I\'m Walter from Venezuela. I loved the food of Kanazawa and it\'s awesome people! My favourite dish was the tempura soup. ', 2),
(55, 'Dog', 'http://travelwithus.sodeproject.com/postimgs/post_img_5df7076155d3e.jpeg', 'Matinori', 3),
(56, 'mama', 'http://travelwithus.sodeproject.com/postimgs/post_img_5df8135b70ee5.jpeg', 'Good presentation', 3);

-- --------------------------------------------------------

--
-- テーブルの構造 `spot`
--

CREATE TABLE `spot` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `spot_image` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- テーブルのデータのダンプ `spot`
--

INSERT INTO `spot` (`id`, `name`, `spot_image`) VALUES
(1, 'KanazawaEki', 'http://project-one.sakura.ne.jp/travel/Home/img/background.png'),
(2, 'HigashiChayaGai', 'http://project-one.sakura.ne.jp/travel/Home/img/higashi_chaya.jpg'),
(3, 'Other', 'https://project-one.sakura.ne.jp/travel/Post/Spot/img/picture.png');

--
-- ダンプしたテーブルのインデックス
--

--
-- テーブルのインデックス `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`id`);

--
-- テーブルのインデックス `spot`
--
ALTER TABLE `spot`
  ADD PRIMARY KEY (`id`);

--
-- ダンプしたテーブルのAUTO_INCREMENT
--

--
-- テーブルのAUTO_INCREMENT `post`
--
ALTER TABLE `post`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- テーブルのAUTO_INCREMENT `spot`
--
ALTER TABLE `spot`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
