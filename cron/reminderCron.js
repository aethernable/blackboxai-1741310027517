const cron = require('node-cron');
const ReminderService = require('../services/reminderService');

class ReminderCron {
    constructor() {
        this.reminderService = new ReminderService();
    }

    // Start the cron job to check reminders every minute
    start() {
        console.log('Starting reminder cron job...');
        
        // Schedule job to run every minute
        cron.schedule('* * * * *', async () => {
            try {
                console.log('Checking for due reminders...');
                const count = await this.reminderService.checkAndSendDueReminders();
                if (count > 0) {
                    console.log(`Processed ${count} reminders`);
                }
            } catch (error) {
                console.error('Error in reminder cron job:', error);
            }
        });
    }

    // Stop the cron job (useful for graceful shutdown)
    stop() {
        if (this.cronJob) {
            this.cronJob.stop();
            console.log('Reminder cron job stopped');
        }
    }
}

module.exports = new ReminderCron();
