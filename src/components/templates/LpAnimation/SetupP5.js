import { Ball } from './class/ballClass';

// 生成されるボールの数
const numBalls = 2;
// canvas の背景色
const bgcol = 25;
// ボールクラスを保存する配列
let ballArr = [];
// ボール追加フラグ
let addBallsFlag = false;
// ボール削除フラグ
let clearBallsFlag = false;

// vue ファイルで p5 インスタンスに渡す関数
const p5Setup = function (p5) {
	// はじめに呼ばれる
	p5.setup = () => {
		// canvas 生成
		const canvas = p5.createCanvas(500, 500);
		// <div id="canvas"> に canvas を配置
		canvas.parent('canvas');
		// canvas の背景色
		p5.background(bgcol);
		// canvas 内の動きをなめらかにする
		p5.smooth();
		// draw()を 1/30秒ごとに実行
		p5.frameRate(30);
	};

	// 1/frameRate 秒ごとに呼ばれる
	p5.draw = () => {
		p5.background(bgcol);
		for (let i = 0; i < ballArr.length; i++) {
			const thisBall = ballArr[i];

			// ボールの位置を計算
			thisBall.update(p5)

			// マウスが押されていれば、マウス方向へボールを移動
			if (p5.mouseIsPressed) {
				thisBall.agg(p5, p5.mouseX, p5.mouseY);
			}
		}

		// ボールを追加
		if (addBallsFlag) {
			for (let i = 0; i < numBalls; i++) {
				const thisBall = new Ball(p5);
				thisBall.drawBall(p5);
				ballArr.push(thisBall);
			}
			addBallsFlag = false;
		}

		// ボールを全て削除
		if (clearBallsFlag) {
			ballArr = [];
			clearBallsFlag = false;
		}
	};
};

// ボール追加フラグの変更
const addBalls = () => {
	addBallsFlag = true;
}

// ボール削除フラグの変更
const clearBalls = () => {
	clearBallsFlag = true;
}

export { p5Setup, addBalls, clearBalls };
