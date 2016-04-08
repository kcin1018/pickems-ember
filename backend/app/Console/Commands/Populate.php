<?php

namespace Pickems\Console\Commands;

use Pickems\Team;
use Pickems\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class Populate extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'pickems:populate';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Populate the database with test data';

    /**
     * Create a new command instance.
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $this->clearDatabase();

        $numberOfUsers = 25;
        $numberOfTeams = 3;

        $bar = $this->output->createProgressBar(count($numberOfUsers * $numberOfTeams));
        factory(User::class, $numberOfUsers)
            ->create()
            ->each(function ($user) use ($numberOfTeams, $bar) {
                factory(Team::class, $numberOfTeams)->create(['user_id' => $user->id]);
                $bar->advance();
            });

        $bar->finish();
        $this->info('');
    }

    private function clearDatabase()
    {
        // DB::statement('TRUNCATE TABLE team_picks CASCADE');
        // DB::statement('ALTER SEQUENCE team_picks_id_seq RESTART WITH 1');
        DB::statement('TRUNCATE TABLE teams CASCADE');
        DB::statement('ALTER SEQUENCE teams_id_seq RESTART WITH 1');
        DB::statement('DELETE FROM users WHERE id > 1');
        DB::statement('ALTER SEQUENCE teams_id_seq RESTART WITH 2');
    }
}
