var app = {
    watchId: null,

    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {
        console.log('Ready');
        this.updateStatus('Ready');
        
        document.getElementById('startBtn').addEventListener('click', this.startTracking.bind(this));
        document.getElementById('stopBtn').addEventListener('click', this.stopTracking.bind(this));
    },

    startTracking: function() {
        if (!navigator.geolocation) {
            this.updateStatus('GPS not available');
            return;
        }

        this.updateStatus('Starting GPS...');

        var options = {
            enableHighAccuracy: true,
            timeout: 30000,
            maximumAge: 0
        };

        this.watchId = navigator.geolocation.watchPosition(
            this.onSuccess.bind(this),
            this.onError.bind(this),
            options
        );

        document.getElementById('startBtn').disabled = true;
        document.getElementById('stopBtn').disabled = false;
        this.updateStatus('Tracking...');
    },

    stopTracking: function() {
        if (this.watchId !== null) {
            navigator.geolocation.clearWatch(this.watchId);
            this.watchId = null;
        }

        document.getElementById('startBtn').disabled = false;
        document.getElementById('stopBtn').disabled = true;
        document.getElementById('speedKmh').textContent = '0';
        this.updateStatus('Stopped');
    },

    onSuccess: function(position) {
        var speedMs = position.coords.speed;

        if (speedMs !== null && speedMs >= 0) {
            var speedKmh = speedMs * 3.6;
            document.getElementById('speedKmh').textContent = Math.round(speedKmh);
        } else {
            document.getElementById('speedKmh').textContent = '0';
        }

        this.updateStatus('Tracking...');
    },

    onError: function(error) {
        var errorMessage = 'Error';
        switch(error.code) {
            case error.PERMISSION_DENIED:
                errorMessage = 'Permission denied';
                break;
            case error.POSITION_UNAVAILABLE:
                errorMessage = 'GPS unavailable';
                break;
            case error.TIMEOUT:
                errorMessage = 'GPS timeout';
                break;
        }
        this.updateStatus(errorMessage);
    },

    updateStatus: function(message) {
        var statusElement = document.getElementById('status');
        if (statusElement) {
            statusElement.textContent = message;
        }
    }
};

app.initialize();
