/**
 * Canvas Racing Car Renderer
 * 
 * ASCII文字で表示されているレーシングカーを同じ見た目・サイズで
 * CanvasRenderingContext2Dを使ってcanvasに描画するクラス
 * 
 * 元のデザイン:
 * 通常: o●o / ◆ / O●O
 * ダメージ: O● O / ◆ / o ●o
 */

class CanvasRacingCar {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        
        // 車のサイズ（元のSVGサイズに合わせる）
        this.width = 40;
        this.height = 54;
        
        // 色設定（視認性向上のため）
        this.colors = {
            smallWheel: '#2a5f41',      // 小さいホイール（緑系）
            largeWheel: '#2a5f41',      // 大きいホイール（緑系）
            centerBody: '#cc3333',       // 中央ボディ（赤系）
            diamond: '#4a9f6a',         // ダイアモンド型ボディ（緑系）
            wheelStroke: '#1a3f2a'      // ホイール輪郭
        };
        
        // 状態管理
        this.state = 'normal'; // 'normal', 'knocked', 'left', 'right'
        this.rotation = 0;
        this.scale = 1;
        this.position = { x: 0, y: 0 };
        this.animationEnabled = true;
        this.animationTime = 0;
    }

    /**
     * 通常状態のレーシングカーを描画
     * o●o (y=6)
     *  ◆  (y=24)
     * O●O (y=42)
     */
    drawNormalCar() {
        const ctx = this.ctx;
        
        // 1行目: o●o (小さいホイール + 中央ボディ + 小さいホイール)
        this.drawSmallWheel(8, 6);   // 左小ホイール
        this.drawCenterBody(20, 6);  // 中央ボディ
        this.drawSmallWheel(32, 6);  // 右小ホイール
        
        // 2行目: ◆ (ダイアモンド型ボディ)
        this.drawDiamondBody(20, 24);
        
        // 3行目: O●O (大きいホイール + 中央ボディ + 大きいホイール)
        this.drawLargeWheel(8, 42);   // 左大ホイール
        this.drawCenterBody(20, 42);  // 中央ボディ
        this.drawLargeWheel(32, 42);  // 右大ホイール
    }

    /**
     * ダメージ状態のレーシングカーを描画
     * O● O (y=6) - 大きいホイールが離れている
     *  ◆   (y=24)
     * o ●o (y=42) - 小さいホイールに隙間
     */
    drawKnockedCar() {
        // 1行目: O● O (ダメージ - 大きいホイールが離れている)
        this.drawLargeWheel(6, 6);    // 左大ホイール（左寄り）
        this.drawCenterBody(20, 6);   // 中央ボディ
        this.drawLargeWheel(34, 6);   // 右大ホイール（右寄り）
        
        // 2行目: ◆ (変わらず)
        this.drawDiamondBody(20, 24);
        
        // 3行目: o ●o (小さいホイール、隙間あり)
        this.drawSmallWheel(8, 42);   // 左小ホイール
        this.drawCenterBody(20, 42);  // 中央ボディ
        this.drawSmallWheel(32, 42);  // 右小ホイール
    }

    /**
     * 左向き状態のレーシングカーを描画（楕円で遠近感表現）
     */
    drawLeftFacingCar() {
        // 楕円形で左向きの遠近感を表現
        this.drawEllipseWheel(6, 6, 4, 3);     // 上左
        this.drawCenterBody(18, 6);
        this.drawEllipseWheel(30, 6, 3, 4);    // 上右
        
        // ダイアモンドを少し左寄りに
        this.drawDiamondBody(18, 24);
        
        this.drawEllipseWheel(6, 42, 5, 4);    // 下左
        this.drawCenterBody(18, 42);
        this.drawEllipseWheel(30, 42, 4, 5);   // 下右
    }

    /**
     * 右向き状態のレーシングカーを描画（楕円で遠近感表現）
     */
    drawRightFacingCar() {
        // 楕円形で右向きの遠近感を表現
        this.drawEllipseWheel(10, 6, 3, 4);    // 上左
        this.drawCenterBody(22, 6);
        this.drawEllipseWheel(34, 6, 4, 3);    // 上右
        
        // ダイアモンドを少し右寄りに
        this.drawDiamondBody(22, 24);
        
        this.drawEllipseWheel(10, 42, 4, 5);   // 下左
        this.drawCenterBody(22, 42);
        this.drawEllipseWheel(34, 42, 5, 4);   // 下右
    }

    /**
     * 小さい円形ホイール (o) を描画
     */
    drawSmallWheel(x, y) {
        const ctx = this.ctx;
        const rotation = this.animationEnabled ? this.animationTime * 0.01 : 0;
        
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotation);
        
        ctx.fillStyle = this.colors.smallWheel;
        ctx.strokeStyle = this.colors.wheelStroke;
        ctx.lineWidth = 0.5;
        
        ctx.beginPath();
        ctx.arc(0, 0, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        
        ctx.restore();
    }

    /**
     * 大きい円形ホイール (O) を描画（中空）
     */
    drawLargeWheel(x, y) {
        const ctx = this.ctx;
        const rotation = this.animationEnabled ? this.animationTime * 0.01 : 0;
        
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotation);
        
        ctx.strokeStyle = this.colors.largeWheel;
        ctx.lineWidth = 1.5;
        
        ctx.beginPath();
        ctx.arc(0, 0, 4, 0, Math.PI * 2);
        ctx.stroke();
        
        ctx.restore();
    }

    /**
     * 楕円形ホイール（左右向き用）
     */
    drawEllipseWheel(x, y, radiusX, radiusY, filled = true) {
        const ctx = this.ctx;
        const rotation = this.animationEnabled ? this.animationTime * 0.01 : 0;
        
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotation);
        
        if (filled) {
            ctx.fillStyle = this.colors.smallWheel;
            ctx.strokeStyle = this.colors.wheelStroke;
            ctx.lineWidth = 0.5;
        } else {
            ctx.strokeStyle = this.colors.largeWheel;
            ctx.lineWidth = 1;
        }
        
        ctx.beginPath();
        ctx.ellipse(0, 0, radiusX, radiusY, 0, 0, Math.PI * 2);
        
        if (filled) {
            ctx.fill();
        }
        ctx.stroke();
        
        ctx.restore();
    }

    /**
     * 中央ボディ (●) を描画
     */
    drawCenterBody(x, y) {
        const ctx = this.ctx;
        const rotation = this.animationEnabled ? this.animationTime * 0.015 : 0;
        
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotation);
        
        ctx.fillStyle = this.colors.centerBody;
        ctx.strokeStyle = '#aa2222';
        ctx.lineWidth = 0.5;
        
        ctx.beginPath();
        ctx.arc(0, 0, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        
        ctx.restore();
    }

    /**
     * ダイアモンド型ボディ (◆) を描画
     */
    drawDiamondBody(x, y) {
        const ctx = this.ctx;
        
        ctx.fillStyle = this.colors.diamond;
        ctx.strokeStyle = this.colors.smallWheel;
        ctx.lineWidth = 1;
        
        ctx.beginPath();
        ctx.moveTo(x, y - 6);      // 上
        ctx.lineTo(x + 6, y);      // 右
        ctx.lineTo(x, y + 6);      // 下
        ctx.lineTo(x - 6, y);      // 左
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }

    /**
     * メイン描画メソッド
     */
    draw() {
        const ctx = this.ctx;
        
        // キャンバスをクリア
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // トランスフォームを適用
        ctx.save();
        ctx.translate(this.position.x + this.width/2, this.position.y + this.height/2);
        ctx.rotate(this.rotation);
        ctx.scale(this.scale, this.scale);
        ctx.translate(-this.width/2, -this.height/2);
        
        // 状態に応じて描画
        switch(this.state) {
            case 'normal':
                this.drawNormalCar();
                break;
            case 'knocked':
                this.drawKnockedCar();
                break;
            case 'left':
                this.drawLeftFacingCar();
                break;
            case 'right':
                this.drawRightFacingCar();
                break;
            default:
                this.drawNormalCar();
                break;
        }
        
        ctx.restore();
        
        // アニメーション更新
        if (this.animationEnabled) {
            this.animationTime += 1;
        }
    }

    // 状態変更メソッド
    setState(newState) {
        this.state = newState;
    }

    // 位置設定
    setPosition(x, y) {
        this.position.x = x;
        this.position.y = y;
    }

    // 回転設定（度数）
    setRotation(degrees) {
        this.rotation = degrees * Math.PI / 180;
    }

    // スケール設定
    setScale(scale) {
        this.scale = scale;
    }

    // アニメーション制御
    setAnimation(enabled) {
        this.animationEnabled = enabled;
    }

    // 移動メソッド
    move(x, y) {
        this.setPosition(x, y);
    }

    // 回転メソッド
    rotate(degrees) {
        this.setRotation(degrees);
    }

    // 連続描画（アニメーションループ用）
    startAnimation() {
        const animate = () => {
            this.draw();
            if (this.animationEnabled) {
                requestAnimationFrame(animate);
            }
        };
        animate();
    }

    // サイズ取得
    getSize() {
        return { width: this.width, height: this.height };
    }
}

// 使用例とコントローラークラス
class CanvasCarController {
    constructor(canvas) {
        this.car = new CanvasRacingCar(canvas);
        
        // 初期位置を中央に設定
        this.car.setPosition(
            canvas.width / 2 - this.car.width / 2,
            canvas.height / 2 - this.car.height / 2
        );
        
        // アニメーション開始
        this.car.startAnimation();
    }

    // 状態変更
    showNormal() { this.car.setState('normal'); }
    showKnocked() { this.car.setState('knocked'); }
    showLeft() { this.car.setState('left'); }
    showRight() { this.car.setState('right'); }

    // アニメーション制御
    setAnimation(enabled) { this.car.setAnimation(enabled); }

    // トランスフォーム制御
    rotate(degrees) { this.car.setRotation(degrees); }
    move(x, y) { this.car.setPosition(x, y); }
    scale(factor) { this.car.setScale(factor); }

    // 手動描画
    draw() { this.car.draw(); }
}